const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");

var data_id = 0 ; // ====


const addCountryItem = async (element, response) =>  {
  let { name, code } = element;
  if(name && code) {

    data_id  = generateObjId(data_id);

    let newCountry = new Country({data_id, name, code });
    await newCountry.save( err => {
      if(err != null) {
        console.log("ADD COUNTRY FAIL",{err:`save ${element} fail - ${err}`, msg: "Fail"});
        return response.status(200).json({err:`save ${element} fail - ${err}`, msg: "Fail"});
      } else {
        console.log("ADD COUNTRY SUCCESS",{err:`save ${name} success`, msg: "Success"});
        // console.log(data_id);
      }
    });

  } else {
    if(!name) {
      console.log("ADD COUNTRY FAIL",{err:`data not exist - ${element}`, msg: "Fail"});
      return response.status(200).json({err:`data not exist - ${element}`, msg: "Fail"});
    }
    else if(!code) {
      console.log("ADD COUNTRY FAIL",{err:`code not exist - ${element}`, msg: "Fail"});
      return response.status(200).json({err:`code not exist - ${element}`, msg: "Fail"});
    } 
  }
};

const addCountry = async (request, response) => {

  let { dataCountry } = request.body;
  // console.log(request.body);

  ObjId.find({},async (err,data) => {
    console.log(data);
    data_id = data[0].countryId;


    for (let element of dataCountry) {
      // Good: all asynchronous operations are immediately started.
      await addCountryItem(element,response);
    }

    
    console.log('Done!');
    
    data[0].set({ countryId:data_id });
    data[0].save((err, updateddata) => console.log(updateddata));

    // client
    console.log("ADD COUNTRY SUCCESS",{err: null,msg: "Success"});
    response.status(200).json({err: null,msg: "Success"});

  });
}

module.exports.addCountry = addCountry;