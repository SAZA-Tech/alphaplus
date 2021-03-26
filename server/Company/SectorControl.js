const Sector = require("./Models/SectorModel");
const { UserInputError } = require("apollo-server");
const { validateSectorInput } = require("../Auth/validators");
module.exports.SectorControl = {

// create Sector
createSector:async (
    _,
    {
    SectorInput:{
      Secname
    },
    
    },
    
  ) => {
    const { valid, errors } = validateSectorInput(
        Secname,
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const secName = Secname;

      const newSector = new Sector({
        secName,
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
    const sectors = await Sector.find();
    return sectors;
  } catch (err) {
    throw new Error(err);
  }

},

};
