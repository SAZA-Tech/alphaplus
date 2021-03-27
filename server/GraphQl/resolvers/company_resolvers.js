const { compare } = require("bcryptjs");
const Company = require("../../Company");

module.exports = {
  Query: {
    getSectors:Company.SectorControl.getSectors,
    getCompanies:Company.CompanyControl.getCompanies,
  },
  Mutation: {
    createSector: Company.SectorControl.createSector,
    deleteSector: Company.SectorControl.deleteSector,
    createCompany: Company.CompanyControl.createCompany,
    deleteCompany:Company.CompanyControl.deleteCompany,
    editSector:Company.SectorControl.editSector,
    

  },
};
