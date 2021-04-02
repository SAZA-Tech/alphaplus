//backend work on modules
const Company = require("./Models/CompanyModel");
const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateCompanyInput } = require("../Auth/validators");

const axios = require("axios");
const api_key = "1cfa225648705ed25cf698d3f8ce2c06";
const { isAuthrized } = require("../Auth/Autherization");
const checkAuth = require("../Auth/check-auth");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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
    var companies = [];
    function todayDate() {
      //Check if map has today's finance data
      const date = new Date();
      const day = date.getDay;
      // Check if its a weekend
      if (day > 4) date.setDate(date.getDate() - 2);
      // Check if its the end of the day ?
      if (date.getHours() < 16) date.setDate(date.getDate() - 1);
      // console.log(date.getHours().valueOf() )
      todayDate = date.toISOString().split("T")[0];
    
      const formatedDate = `${todayDate}T00:00:00+0000`;
    
      return formatedDate;
      // not weekend + missing fin data : False
    }

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
    for (let index = 0; index < CompanyDocs.length; index++) {
      const element = CompanyDocs[index];

      var apiCount = 1;

      var fin = new Map(element.financialData);
      var formatedDate = todayDate();

      if (!fin.has(formatedDate)) {
        if (apiCount % 5 == 0) {
          await sleep(1000);
        }
        await axios
          .get(
            `http://api.marketstack.com/v1/eod?access_key=${api_key}&limit=1&symbols=${element.symbol}`
          )
          .then(async (response) => {
            const apiResponse = response.data;
            // console.log(apiResponse);
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
            formatedDate = apiResponse["data"][0]["date"];
          })
          .catch((err) => {
            throw new Error(`Error happend fetching new finance data ${err}`);
          });
        element.financialData = fin;
        await element.save();
        apiCount++;
      }
      var apiCount = 1;
      // console.log(e);
      const getLastDate = fin.get(formatedDate);
      // console.log(getLastDate);

      var arr = Array.from(fin.values());
      //Check has latest price
      companies.push({
        id: element._id,
        sectorId: element.sectorId,
        market: element.market,
        comname: element.comname,
        symbol: element.symbol,
        financialData: arr,
        todayFinance: getLastDate,
      });
      console.log(companies);
    }
    console.log(`last call`, companies);

    return companies;
  },

  validateTags: async (_, arr) => {
    var symbols = [];
    symbols = arr;
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
        throw new Error(`${symbols[index]} is not listed in Alpha+`);
      }

      for (let j = 0; j < companiespart.length; j++) {
        companies.push(companiespart[j]);
      }
    }

    return companies;
  },

  editCompany: async (
    _,
    { CompanyInput: { Symbol, SectorID, Market, Comname, CompanyID } }
  ) => {
    try {
      const companydoc= await Company.findById(CompanyID).exec();
  
      if(companydoc.$isValid){
        
        if(Comname!=null){
          companydoc.comname=Comname;

        }
        if(Market!=null){
          companydoc.market=Market;

        }
        if(SectorID!=null){
          companydoc.sectorId=SectorID;

        }
        
        const res =await companydoc.save();

        const arrMap = Array.from(res.financialData.values());
        
        return{
          id:res._id,
          sectorId:res.sectorId,
          market:res.market,
          comname:res.comname,
          symbol:res.symbol,
          todayFinance:arrMap[arrMap.length-1],
          financialData:arrMap,
        }
  
      }else{
        throw new Error("sector Not Found");
      }
  
      
    } catch (error) {
      throw new Error(`Error Happend ${error}`);
      
    }




  }


};

