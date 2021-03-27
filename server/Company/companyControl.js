//backend work on modules
const Company = require("./Models/CompanyModel");
const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateSectorInput } = require("../Auth/validators");
const axios = require("axios");
const api_key = "654fbc8fbce32c1f6acb1c5744730a1f";
module.exports.CompanyControl = {
  createCompany: async (
    _,
    { CompanyInput: { Symbol, SectorID, Market, Comname } }
  ) => {
    const sector = await Sector.findById(SectorID);
    var market = Market;
    var comname = Comname;
    var symbol = Symbol;

    const newCompany = new Company({
      sectorId: sector._id,
      market,
      comname,
      symbol,
    });
 
    var myMap = new Map()
    await axios
      .get(
        `http://api.marketstack.com/v1/eod?access_key=${api_key}&limit=7&symbols=${symbol}`
      )
      .then(async(response) => {
        // var count = 0;
        const apiResponse = response.data;
        
        var length = apiResponse['data'].length-1;
        console.log(length);
        for (let index = 0; index <= length; index++) {

          myMap [`${index}`]={ 
          exchange: apiResponse['data'][index]['exchange'],
          Open: apiResponse['data'][index]['open'],
          high: apiResponse['data'][index]['high'],
          low: apiResponse['data'][index]['low'],
          close: apiResponse['data'][index]['close'],
          volume: apiResponse['data'][index]['volume'],
          date:apiResponse['data'][index]['date'],
        }    
        };
      }); 
      newCompany.financialData={ 
        date1:myMap[0],
        date2:myMap[1],
        date3:myMap[2],
        date4:myMap[3],
        date5:myMap[4],
        date6:myMap[5],
        date7:myMap[6],  
      };
       const res = await newCompany.save();
        sector.sectorCompanies.push(res._id);
        await sector.save();
        const company = {
            id: res._id,
           sectorId: sector._id,
           market: market,
           comname: comname,
            symbol: symbol,
            ...myMap[0]
    };
    console.log(company);

    return company;

  },

  deleteCompany: async (_, { companyId }) => {
    try {
      const deleteCompany = await Company.findById(companyId);
      return deleteCompany
        .delete()
        .then(() => "company is deleted successfully")
        .catch((err) => console.log(`Failed to delete the company ${err}`));
    } catch (error) {
      throw new Error(`Error Happend ${error}`);
    }
  },

  getCompanies: async (
    _,
    { CompanyInput: { Symbol, SectorID, Market, Comname, CompanyID } }
  ) => {
    let CompanyDocs = [];

    if (
      (Symbol == null) &
      (SectorID == null) &
      (Market == null) &
      (Comname == null) &
      (CompanyID == null)
    ) {
      CompanyDocs = await Company.find().populate("sectorId").exec();
    } else {
      const Filter = {};
      if (CompanyID != null) Filter._id = CompanyID;

      if (Symbol != null) Filter.symbol = Symbol;

      if (SectorID != null) Filter.sectorId = SectorID;

      if (Market != null) Filter.market = Market;

      if (Comname != null) Filter.comname = Comname;

      CompanyDocs = await Company.find(Filter).populate("sectorId").exec();
    }
    const companies = [];
    CompanyDocs.map((e) => {
      companies.push({
        id: e._id,
        ...e._doc,
      });
    });

    return companies;
  },
};
