//backend work on modules
const Company = require("./Models/CompanyModel");
const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateCompanyInput } = require("../Auth/validators");

const axios = require("axios");
const api_key = "654fbc8fbce32c1f6acb1c5744730a1f";
const { isAuthrized } = require("../Auth/Autherization");
const checkAuth = require("../Auth/check-auth");
module.exports.CompanyControl = {
  createCompany: async (
    _,
    { CompanyInput: { Symbol, SectorID, Market, Comname } },
    context
  ) => {
    const { valid, errors } = validateCompanyInput(Symbol, Market, Comname);
    const auth = checkAuth(context);

    if (auth) {
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const sector = await Sector.findById(SectorID);
      var market = Market;
      var comname = Comname;
      var symbol = Symbol;

      const companyExist = await Company.find({
        symbol,
      }).countDocuments();

      if (companyExist > 0) {
        throw new Error(`Company Already Exist`);
      }

      const newCompany = new Company({
        sectorId: sector._id,
        market,
        comname,
        symbol,
      });

      var myMap = new Map();
      await axios
        .get(
          `http://api.marketstack.com/v1/eod?access_key=${api_key}&limit=7&symbols=${symbol}`
        )
        .then(async (response) => {
          const apiResponse = response.data;

          var length = apiResponse["data"].length - 1;
          console.log(length);
          for (let index = 0; index <= length; index++) {
            if (!myMap.has(apiResponse["data"][index]["date"]))
              myMap.set(
                // Key
                apiResponse["data"][index]["date"],
                // Value
                {
                  exchange: apiResponse["data"][index]["exchange"],
                  Open: apiResponse["data"][index]["open"],
                  high: apiResponse["data"][index]["high"],
                  low: apiResponse["data"][index]["low"],
                  close: apiResponse["data"][index]["close"],
                  volume: apiResponse["data"][index]["volume"],
                  date: apiResponse["data"][index]["date"],
                }
              );
            console.log(new Date(myMap.keys[0]).toString());
          }
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(
              "client recieved an erorr response(5xx,4xx) wrong input/out of credit"
            );
          } else {
            console.log(err);
          }
        });

      const arrMap = Array.from(myMap.values());
      console.log(arrMap);
      newCompany.financialData = myMap;
      const res = await newCompany.save();
      sector.sectorCompanies.push(res._id);
      await sector.save();
      const company = {
        id: res._id,
        sectorId: sector._id,
        market: market,
        comname: comname,
        symbol: symbol,
        financialData: arrMap,
        todayFinance: arrMap[0],
      };
      return company;
    } else {
      throw new Error("Not Authrized to create");
    }
  },

  deleteCompany: async (_, id, { companyId }, context) => {
    if (isAuthrized(_, { id }, context)) {
      try {
        const deleteCompany = await Company.findById(companyId);
        return deleteCompany
          .delete()
          .then(() => "company is deleted successfully")
          .catch((err) => console.log(`Failed to delete the company ${err}`));
      } catch (error) {
        throw new Error(`Error Happend ${error}`);
      }
    } else {
      throw new Error("No Autrhized");
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
      CompanyDocs = await Company.find().exec();
    } else {
      const Filter = {};
      if (CompanyID != null) Filter._id = CompanyID;

      if (Symbol != null) Filter.symbol = Symbol;

      if (SectorID != null) Filter.sectorId = SectorID;

      if (Market != null) Filter.market = Market;

      if (Comname != null) Filter.comname = Comname;

      CompanyDocs = await Company.find(Filter).exec();
    }
    const companies = [];
    CompanyDocs.map((e) => {
      var fin = new Map(e.financialData);
      const todayDate = new Date();
      todayDate.setHours(0);
      todayDate.setMinutes(0);
      todayDate.setMilliseconds(0);
      if(!fin.has(todayDate.toISOString))  {
         await axios.get(
          `http://api.marketstack.com/v1/eod?access_key=${api_key}&limit=1&symbols=${e.symbol}`
        )
        .then(async (response) => {
          const apiResponse = response.data;
          fin.set(
                // Key
                apiResponse["data"][0]["date"],
                // Value
                {
                  exchange: apiResponse["data"][0]["exchange"],
                  Open: apiResponse["data"][0]["open"],
                  high: apiResponse["data"][0]["high"],
                  low: apiResponse["data"][0]["low"],
                  close: apiResponse["data"][0]["close"],
                  volume: apiResponse["data"][0]["volume"],
                  date: apiResponse["data"][0]["date"],
                }
              );
          
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(
              "client recieved an erorr response(5xx,4xx) wrong input/out of credit"
            );
          } else {
            console.log(err);
          }
        })
        e.financialData=fin;
        await e.save();
      }
      var arr = Array.from(fin.values());
      //Check has latest price 
      companies.push({
        id: e._id,
        sectorId: e.sectorId,
        market: e.market,
        comname: e.comname,
        symbol: e.symbol,
        financialData:arr ,
        todayFinance: arr[0],
      });
    });

    return companies;
  },

  validateTags: async (_, arr) => {
    var symbols = [];
    symbols = arr.tags;
    for (let index = 0; index < symbols.length; index++) {
      if (symbols[index].trim() == "") {
        throw new UserInputError(`wrong input`);
      }
    }

    var companiespart = [];
    var companies = [];

    for (let index = 0; index < symbols.length; index++) {
      companiespart = await this.CompanyControl.getCompanies(_, {
        CompanyInput: {
          Symbol: symbols[index],
          SectorID: null,
          Market: null,
          Comname: null,
          CompanyID: null,
        },
      });

      if (companiespart[0] == null) {
        throw new Error("wrong symbol");
      }

      for (let j = 0; j < companiespart.length; j++) {
        companies.push(companiespart[j]);
      }
    }

    return companies;
  },
};

function latestPrice(fin) {
    //Check if map has today's finance data 
    if(fin.keys){}

    //today == weekend :true
    
    // not weekend + missing fin data : False
}