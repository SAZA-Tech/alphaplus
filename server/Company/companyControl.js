//backend work on modules
const Company = require("./Models/CompanyModel");
const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateSectorInput } = require("../Auth/validators");
const axios = require('axios');
const api_key= "654fbc8fbce32c1f6acb1c5744730a1f";
module.exports.CompanyControl = {

   createCompany:async (_, { CompanyInput:{Symbol,SectorID,Market,Comname}, }) => {

       const sector = await Sector.findById(SectorID);
        var market=Market;
        var comname = Comname;
        var symbol =Symbol;
       
        

        axios.get(`http://api.marketstack.com/v1/eod?access_key=${api_key}&limit=1&symbols=${symbol}`).then(response =>{

        const apiResponse = response.data;
       
            apiResponse['data'].forEach(async(stockData) =>{
              try {
                
              
                var exchange = stockData['exchange'];
                var Open = stockData['open'];
                var high = stockData['high'];
                var low = stockData['low'];
                var close = stockData['close'];
                var volume = stockData['volume'];

                const newCompany = new Company({
                  sectorId:sector._id,
                  market,
                  comname,
                  symbol,
                  exchange,
                  Open,
                  high,
                  low,
                  close,
                  volume,
            });

          
            const res = await newCompany.save();
            sector.sectorCompanies.push(res._id);
            await sector.save();
         
      
            return {
              id: res._id,
              ...res._doc,
            
            };

            } catch (error) {
              next(error);
            }

           
        
        });
      
  
    });
    

   },


 deleteCompany:async (_, {companyId }) => {

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

  getCompanies:async (_, { CompanyInput:{Symbol,SectorID,Market,Comname,CompanyID}, }) => {
    let CompanyDocs = [];

    if (
      (Symbol == null) &
      (SectorID == null) &
      (Market == null) &
      (Comname == null) &
      (CompanyID == null)
    ) {
      CompanyDocs = await Company.find();

    }else{
      const Filter = {};
      if (CompanyID != null) Filter._id = CompanyID;

      if (Symbol != null) Filter.symbol = Symbol;

      if (SectorID != null) Filter.sectorId = SectorID;

      if (Market != null) Filter.market = Market;

      if (Comname != null) Filter.comname = Comname;

      CompanyDocs = await Company.find(Filter).populate("sectorId")
      .exec();
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