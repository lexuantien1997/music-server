const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");
module.exports = (request, response) => {
  let { dataCountry } = request.body;
  // console.log(request.body);

  ObjId.find({},(err,data) => {
    console.log(data);
    let data_id = data[0].countryId;
    
    dataCountry.forEach(element => {
      let { name, code } = element;
      if(name && code) {

        data_id  = generateObjId(data_id);

        let newCountry = new Country({data_id, name, code });
        newCountry.save( err => {
          if(err != null) {
            console.log("ADD COUNTRY FAIL",{err:`save ${element} fail - ${err}`, msg: "Fail"});
            response.status(200).json({err:`save ${element} fail - ${err}`, msg: "Fail"});
          } else {
          }
        });

      } else {
        if(!name) {
          console.log("ADD COUNTRY FAIL",{err:`data not exist - ${element}`, msg: "Fail"});
          response.status(200).json({err:`data not exist - ${element}`, msg: "Fail"});
        }
        else if(!code) {
          console.log("ADD COUNTRY FAIL",{err:`code not exist - ${element}`, msg: "Fail"});
          response.status(200).json({err:`code not exist - ${element}`, msg: "Fail"});
        } 
      }
    });

    
    data[0].set({ countryId:data_id });
    data[0].save((err, updateddata) => console.log(updateddata));

    // client
    console.log("ADD COUNTRY SUCCESS",{err: null,msg: "Success"});
    response.status(200).json({err: null,msg: "Success"});

  });
};