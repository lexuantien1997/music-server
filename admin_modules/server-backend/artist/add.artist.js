const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");

module.exports = async (request, response) => {
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

  dob = (new Date(dob)).getTime();
  gender = parseInt(gender);

  let countryId = [];
  
  country.forEach(element => countryId.push(element.value));  

  let newArtist;

  let data_id = await ObjId.find({});
  let artistId = data_id[0].artistId;
  artistId  = generateObjId(artistId);

  if(isEmpty(thumbnail) && !isEmpty(avatar) ) 
    newArtist = new Artist({data_id: artistId,fullName,nickName,gender, dob,avatar, country: countryId, story:history, songs:[] });
  else if(isEmpty(avatar) && !isEmpty(thumbnail)) 
    newArtist = new Artist({data_id: artistId,fullName,nickName,gender, dob,thumbnail, country: countryId, story:history, songs:[] });
  else if(!isEmpty(avatar) && !isEmpty(thumbnail)) 
    newArtist = new Artist({data_id: artistId,fullName,nickName,gender,thumbnail,avatar, dob, country: countryId, story:history, songs:[] });
  else 
    newArtist = new Artist({data_id:artistId,fullName,nickName,gender, dob, country: countryId, story:history, songs:[] });

  let artistdata = await newArtist.save(); 
  
  if(artistdata == null) {
    console.log("ADD ARTIST FAIL",{err:1, msg: "Fail"});
    response.status(200).json({err:1, msg: "Fail",  data: {noti: ["Add artist fail"]}});
  }else {
    data_id[0].set({ artistId });
    data_id[0].save((err, updateddata) => console.log(updateddata));

    console.log("ADD ARTIST SUCCESS",{err:null, msg: "Success"});
    response.status(200).json({err:null, msg: "Success",  data: { noti: ["Add artist successfully"]}});
  } 

}