const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");

module.exports = (request, response) => {
  let {
    fullName,
    nickName,
    avatar,
    thumbnail,
    gender,
    dob,
    country,
    history 
  } = request.body;

  gender = parseInt(gender);

  let countryId = [];

  country.forEach(element => countryId.push(element.value));  

  let newArtist;

  console.log(countryId);
  ObjId.find({},(err,data) => {
    console.log(data);
    let data_id = data[0].artistId;
    data_id  = generateObjId(data_id);

    if(isEmpty(thumbnail) && !isEmpty(avatar) ) 
      newArtist = new Artist({data_id,fullName,nickName,gender, dob,avatar, country: countryId, history, songs:[] });
    else if(isEmpty(avatar) && !isEmpty(thumbnail)) 
      newArtist = new Artist({data_id,fullName,nickName,gender, dob,thumbnail, country: countryId, history, songs:[] });
    else if(!isEmpty(avatar) && !isEmpty(thumbnail)) 
      newArtist = new Artist({data_id,fullName,nickName,gender,thumbnail,avatar, dob, country: countryId, history, songs:[] });
    else 
      newArtist = new Artist({data_id,fullName,nickName,gender, dob, country: countryId, history, songs:[] });

    newArtist.save( err => {
      if(err != null) {
        console.log("ADD ARTIST FAIL",{err:`save ${newArtist} fail - ${err}`, msg: "Fail"});
        response.status(200).json({err:`save ${newArtist} fail - ${err}`, msg: "Fail",  data: {noti: ["Add artist fail"]}});
      }else {
        data[0].set({ artistId:data_id });
        data[0].save((err, updateddata) => console.log(updateddata));
        console.log("ADD ARTIST SUCCESS",{err:null, msg: "Success"});
        response.status(200).json({err:null, msg: "Success",  data: { noti: ["Add artist successfully"]}});
      } 
    });
  });
}