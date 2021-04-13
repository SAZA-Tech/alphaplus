const SectorControl = require("./SectorControl");
const CompanyControl = require("./companyControl");
const PortfolioControl = require("./portfolioControl");
module.exports = {
  ...SectorControl,
  ...CompanyControl,
  ...PortfolioControl,
};
