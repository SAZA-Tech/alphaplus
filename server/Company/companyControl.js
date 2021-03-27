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
    var exchange1 = "";
    var Open1 = 0;
    var high1 = 0;
    var low1 = 0;
    var close1 = 0;
    var volume1 = 0;
    var exchange2 = "";
    var Open2 = 0;
    var high2 = 0;
    var low2 = 0;
    var close2 = 0;
    var volume2 = 0;
    var exchange3 = "";
    var Open3 = 0;
    var high3 = 0;
    var low3 = 0;
    var close3 = 0;
    var volume3 = 0;
    var exchange4 = "";
    var Open4 = 0;
    var high4 = 0;
    var low4 = 0;
    var close4 = 0;
    var volume4 = 0;
    var exchange5 = "";
    var Open5 = 0;
    var high5 = 0;
    var low5 = 0;
    var close5 = 0;
    var volume5 = 0;
    var exchange6 = "";
    var Open6 = 0;
    var high6 = 0;
    var low6 = 0;
    var close6 = 0;
    var volume6 = 0;

    var exchange7 = "";
    var Open7 = 0;
    var high7 = 0;
    var low7 = 0;
    var close7 = 0;
    var volume7 = 0;

    await axios
      .get(
        `http://api.marketstack.com/v1/eod?access_key=${api_key}&limit=7&symbols=${symbol}`
      )
      .then((response) => {
        var count = 0;
        const apiResponse = response.data;
        apiResponse["data"].forEach(async (stockData) => {
          try {
            switch (count) {
              case 0:
                exchange1 = stockData["exchange"];
                Open1 = stockData["open"];
                high1 = stockData["high"];
                low1 = stockData["low"];
                close1 = stockData["close"];
                volume1 = stockData["volume"];

                break;

              case 1:
                exchange2 = stockData["exchange"];
                Open2 = stockData["open"];
                high2 = stockData["high"];
                low2 = stockData["low"];
                close2 = stockData["close"];
                volume2 = stockData["volume"];
                break;

              case 2:
                exchange3 = stockData["exchange"];
                Open3 = stockData["open"];
                high3 = stockData["high"];
                low3 = stockData["low"];
                close3 = stockData["close"];
                volume3 = stockData["volume"];
                break;

              case 3:
                exchange4 = stockData["exchange"];
                Open4 = stockData["open"];
                high4 = stockData["high"];
                low4 = stockData["low"];
                close4 = stockData["close"];
                volume4 = stockData["volume"];
                break;

              case 4:
                exchange5 = stockData["exchange"];
                Open5 = stockData["open"];
                high5 = stockData["high"];
                low5 = stockData["low"];
                close5 = stockData["close"];
                volume5 = stockData["volume"];

                break;

              case 5:
                exchange6 = stockData["exchange"];
                Open6 = stockData["open"];
                high6 = stockData["high"];
                low6 = stockData["low"];
                close6 = stockData["close"];
                volume6 = stockData["volume"];

                break;

              case 6:
                exchange7 = stockData["exchange"];
                Open7 = stockData["open"];
                high7 = stockData["high"];
                low7 = stockData["low"];
                close7 = stockData["close"];
                volume7 = stockData["volume"];

                break;
            }

            count = count + 1;

            console.log(count);
          } catch (error) {
            throw new Error(`Error Happend ${error}`);
          }
        });
      });

    newCompany.financialData = {
      date1: {
        exchange: exchange1,
        Open: Open1,
        high: high1,
        low: low1,
        close: close1,
        volume: volume1,
      },

      date2: {
        exchange: exchange2,
        Open: Open2,
        high: high2,
        low: low2,
        close: close2,
        volume: volume2,
      },
      date3: {
        exchange: exchange3,
        Open: Open3,
        high: high3,
        low: low3,
        close: close3,
        volume: volume3,
      },
      date4: {
        exchange: exchange4,
        Open: Open4,
        high: high4,
        low: low4,
        close: close4,
        volume: volume4,
      },
      date5: {
        exchange: exchange5,
        Open: Open5,
        high: high5,
        low: low5,
        close: close5,
        volume: volume5,
      },
      date6: {
        exchange: exchange6,
        Open: Open6,
        high: high6,
        low: low6,
        close: close6,
        volume: volume6,
      },
      date7: {
        exchange: exchange7,
        Open: Open7,
        high: high7,
        low: low7,
        close: close7,
        volume: volume7,
      },
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
      exchange: exchange1,
      Open: Open1,
      high: high1,
      low: low1,
      close: close1,
      volume: volume1,
    };
    console.log(company);

    return company;

    // var b= 'company created'
    // return b;
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
