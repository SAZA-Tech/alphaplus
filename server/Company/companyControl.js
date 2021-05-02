//backend work on modules
const Company = require("./Models/CompanyModel");
const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateCompanyInput } = require("../Auth/validators");

const axios = require("axios");
const api_key = "5160dbc9524eca9f4098ec14861098b6";
const { isAuthrized } = require("../Auth/Autherization");
const checkAuth = require("../Auth/check-auth");
const getArticleWithTags = require("../Content/getArticlesTags");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const createCompany = async (
  _,
  {
    CompanyInput: {
      Symbol,
      SectorID,
      Market,
      Comname,
      intro,
      address,
      website,
      phoneNum,
      Industry,
    },
  },
  context
) => {
  // const { valid, errors } = validateCompanyInput(Symbol, Market, Comname);
  // const auth = checkAuth(context);

  // if (auth) {
  // if (!valid) {
  //   throw new UserInputError("Errors", { errors });
  // }
  const sector = await Sector.findById(SectorID);
  var market = Market;
  var comname = Comname;
  var symbol = Symbol;

  // const companyExist = await Company.find({
  //   symbol,
  // }).countDocuments();

  // if (companyExist > 0) {
  //   throw new Error(`Company Already Exist`);
  // }

  const newCompany = new Company({
    sectorId: sector._id,
    market,
    comname,
    symbol,
    Industry,
    phoneNum,
    website,
    address,
    intro,
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
  information = {
    intro: intro,
    address: address,
    website: website,
    phoneNum: phoneNum,
    Industry: Industry,
  };
  //change = new-old/old
  var change = (arrMap[0].close - arrMap[1].close) / arrMap[1].close;
  console.log(change);
  const company = {
    id: res._id,
    sectorId: sector._id,
    market: market,
    comname: comname,
    symbol: symbol,
    financialData: arrMap,
    todayFinance: arrMap[0],
    info: information,
    change: change,
  };
  return company;
  // } else {
  //   throw new Error("Not Authrized to create");
  // }
};

const deleteCompany = async (_, {id, companyId }, context) => {
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
};

const getCompanies = async (
  _,
  { companyFilter: { Symbol, SectorID, Market, Comname, CompanyID } }
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

    if (Comname != null) Filter.comname = { $regex: Comname, $options: "i" };

    CompanyDocs = await Company.find(Filter).exec();
  }
  var formatedDate = todayDate();
  for (let index = 0; index < CompanyDocs.length; index++) {
    const element = CompanyDocs[index];

    var apiCount = 1;

    var fin = new Map(element.financialData);

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
    //sort here
    arr.sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });


    var change = calculateChange(
      arr[arr.length - 1].close,
      arr[arr.length - 2].close
    );
    // console.log(change);
    //Check has latest price
    var info = {
      intro: element.intro,
      address: element.address,
      website: element.website,
      phoneNum: element.phoneNum,
      Industry: element.Industry,
    }
    companies.push({
      id: element._id,
      sectorId: element.sectorId,
      market: element.market,
      comname: element.comname,
      symbol: element.symbol,
      financialData: arr,
      todayFinance: getLastDate,
      change: change,
      info:info
    });
    // console.log(companies);
  }
  // console.log(`last call`, companies);

  return companies;
};
function calculateChange(close1, close2) {
  var changeValue = Math.floor(((close1 - close2) / close2) * 100);
  changeValue = (changeValue <= 0 ? "" : "+") + changeValue;

  return `${close1}(${changeValue}%)`;
}
const validateTags = async (_, arr) => {
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
      companyFilter: {
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
};

const editCompany = async (
  _,
  {
    CompanyInput: {
      Symbol,
      SectorID,
      Market,
      Comname,
      CompanyID,
      intro,
      address,
      website,
      phoneNum,
      Industry,
    },
  }
) => {
  try {
    const companydoc = await Company.findById(CompanyID).exec();

    if (companydoc.$isValid) {
      if (intro != null) {
        companydoc.intro = intro;
      }
      if (address != null) {
        companydoc.address = address;
      }
      if (website != null) {
        companydoc.website = website;
      }
      if (phoneNum != null) {
        companydoc.phoneNum = phoneNum;
      }
      if (Industry != null) {
        companydoc.Industry = Industry;
      }

      if (Comname != null) {
        companydoc.comname = Comname;
      }
      if (Market != null) {
        companydoc.market = Market;
      }
      if (SectorID != null) {
        companydoc.sectorId = SectorID;
      }

      const res = await companydoc.save();

      const arrMap = Array.from(res.financialData.values());

      return {
        id: res._id,
        sectorId: res.sectorId,
        market: res.market,
        comname: res.comname,
        symbol: res.symbol,
        todayFinance: arrMap[arrMap.length - 1],
        financialData: arrMap,
      };
    } else {
      throw new Error("sector Not Found");
    }
  } catch (error) {
    throw new Error(`Error Happend ${error}`);
  }
};
const getCompany = async (_, { companyId }) => {
  const companydoc = await getCompanies(_, {
    companyFilter: {
      Comname: null,
      CompanyID: companyId,
      Market: null,
      SectorID: null,
      Symbol: null,
    },
  });
  const company = companydoc[0];
  const tags = [company.symbol];
  const secotr = company.sectorId;
  const relatedArticles = await getArticleWithTags(tags);
  const similarCompanies = await getCompanies(_, {
    companyFilter: {
      Comname: null,
      CompanyID: null,
      Market: null,
      SectorID: secotr,
      Symbol: null,
    },
  });
  const info = {
    intro: company.info.intro,
    address: company.info.address,
    website: company.info.website,
    phoneNum: company.info.phoneNum,
    Industry: company.info.Industry,
  }
  console.log(info);
  return {
    id: company._id,
    articles: relatedArticles,
    similarCompanies: similarCompanies,
    info:info,

    ...company,
  };
};
module.exports.CompanyControl = {
  createCompany,
  editCompany,
  validateTags,
  getCompanies,
  deleteCompany,
  getCompany,
};
