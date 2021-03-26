const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateSectorInput } = require("../Auth/validators");
module.exports.SectorControl = {

// create Sector
createSector:async (
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



  },

//Delete Sector
deleteSector: async (_, { sectorID }) => {
  
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
 

},
getSectors:async(_,) => {

  try {
    const sectorsdoc = await Sector.find().populate("sectorCompanies").exec();
    const sector=[];
    sectorsdoc.map((e)=>{
      sector.push({
        id:e._id,
        ...e._doc,
      });

    });
    return sector;
  } catch (err) {
    throw new Error(err);
  }

},
editSector:async(_,sectorID,{SectorInput:{SecnameInput}},) => {
  try {
    const sectordoc= await Sector.findById(sectorID).populate("sectorCompanies").exec();

    if(sectordoc.$isValid){
      sectordoc.Secname=SecnameInput;
      
      const res =await sectordoc.save();

      return{
        id:res._id,

        ...res._doc,
      }

    }else{
      throw new Error("sector Not Found");
    }

    
  } catch (error) {
    throw new Error(`Error Happend ${error}`);
    
  }


},

};
