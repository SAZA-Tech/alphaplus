const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateSectorInput } = require("../Auth/validators");
const {CompanyControl} = require("./companyControl");


// create Sector
const createSector=async (
    _,
    {
    SectorInput:{
      SecnameInput
    },
    
    },
    
  ) => {
    const { valid, errors } = validateSectorInput(
      SecnameInput,
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const Secname = SecnameInput;

      const newSector = new Sector({
        Secname,
      });
   
      const res = await newSector.save();

      return {
        ...res._doc,
        id: res._id,
      };



  };

//Delete Sector
const deleteSector= async (_, { sectorID }) => {
  
    try {
        const deleteSector = await Sector.findById(sectorID);
        return deleteSector
        .delete()
        .then(() => "Sector Is Deleted Successfully")
        .catch((err) => {
          throw new Error("Failed to delete Sector" + err);
        });
    } catch (error) {
        throw new Error(`Error Happend ${error}`);
    }
 

};
const getSectors=async(_,) => {

  try {
    const sectorsdoc = await Sector.find().exec();
   
    var sector=[];
    sectorsdoc.map((e)=>{
      var companies =[];
      companies =  CompanyControl.getCompanies(_,{
        CompanyInput:{
        Symbol:null,
        SectorID:e._id,
        Market:null,
        Comname:null,
        CompanyID:null
      }});
      sector.push({
        id:e._id,
        Secname:e.Secname,
        sectorCompanies:companies
      });

    });
    return sector;
  } catch (err) {
    throw new Error(err);
  }

};
const editSector=async(_,sectorID,{SectorInput:{SecnameInput}},) => {
  try {
    const sectordoc= await Sector.findById(SectorID).exec();

    if(sectordoc.$isValid){
      sectordoc.Secname=SecnameInput;
      
      const res =await sectordoc.save();

      var companies =[];
      companies =  CompanyControl.getCompanies(_,{
        CompanyInput:{
        Symbol:null,
        SectorID:res._id,
        Market:null,
        Comname:null,
        CompanyID:null
      }});

      return{
        id:res._id,
        Secname:res.Secname,
        sectorCompanies:companies
      }

    }else{
      throw new Error("sector Not Found");
    }

    
  } catch (error) {
    throw new Error(`Error Happend ${error}`);
    
  }


};
module.exports.SectorControl = {
  editSector,
  getSectors,
  deleteSector,
  createSector,


}

