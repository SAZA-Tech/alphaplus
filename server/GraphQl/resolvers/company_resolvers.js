const Company = require("../../Company");

module.exports = {
  Query: {
    
  },
  Mutation: {
    createSector: Company.SectorControl.createSector,
    deleteSector: Company.SectorControl.deleteSector,
    createCompany: Company.CompanyControl.createCompany,
    deleteCompany:Company.CompanyControl.deleteCompany,

  },
};
