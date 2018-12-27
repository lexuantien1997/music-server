const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");

var data_id = 0 ; // ====

const addSongTypeItem = async (element, response) =>  {
  let { name, code } = element;
  if(name && code) {
    
    data_id  = generateObjId(data_id);

    let newSongType = new SongType({data_id, name, code });
    await newSongType.save( err => {
      if(err != null) {
        console.log("ADD SONG TYPE FAIL",{err:`save ${element} fail - ${err}`, msg: "Fail"});
        return response.status(200).json({err:`save ${element} fail - ${err}`, msg: "Fail"});
      } else {
        console.log("ADD SONG TYPE SUCCESS",{err:`save ${name} success`, msg: "Success"});
      }
    });

  } else {
    if(!name) {
      console.log("ADD SONG TYPE FAIL",{err:`data not exist - ${element}`, msg: "Fail"});
      return response.status(200).json({err:`data not exist - ${element}`, msg: "Fail"});
    }
    else if(!code) {
      console.log("ADD SONG TYPE FAIL",{err:`code not exist - ${element}`, msg: "Fail"});
      return response.status(200).json({err:`code not exist - ${element}`, msg: "Fail"});
    } 
  }
};


const addSongType = async (request, response) => {
  let { dataSongType } = request.body;
  // console.log(request.body);
 
  ObjId.find({},async(err,data) => {
    console.log(data);
    data_id = data[0].songTypeId;
    
    for (let element of dataSongType) {
      // Good: all asynchronous operations are immediately started.
      await addSongTypeItem(element,response);
    }

    data[0].set({ songTypeId:data_id });
    data[0].save((err, updateddata) => console.log(updateddata));

     // client
    console.log("ADD SONG TYPE SUCCESS",{err: null,msg: "Success"});
    response.status(200).json({err: null,msg: "Success"});

  }); 
}

module.exports.addSongType = addSongType;