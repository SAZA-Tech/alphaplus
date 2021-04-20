const { compare } = require("bcryptjs");
const Company = require("../../Company");

module.exports = {
  Query: {
    getSectors: Company.SectorControl.getSectors,
    getCompanies: Company.CompanyControl.getCompanies,
    getCompany: Company.CompanyControl.getCompany,
    validateTags: Company.CompanyControl.validateTags,
    getPortfolio: Company.PortfolioControl.getPortfolio,
  },
  Mutation: {
    createSector: Company.SectorControl.createSector,
    deleteSector: Company.SectorControl.deleteSector,
    createCompany: Company.CompanyControl.createCompany,
    deleteCompany: Company.CompanyControl.deleteCompany,
    editSector: Company.SectorControl.editSector,
    editCompany: Company.CompanyControl.editCompany,
    createPortfolio: Company.PortfolioControl.createPortfolio,
    editPortfolio:Company.PortfolioControl.editPortfolio,
  },
};
