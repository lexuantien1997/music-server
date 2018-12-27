const { ObjId, Country, SongType, Artist, Song } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const axios = require("axios");

const generateObjId = require("../generate-Id");

const getArtistItem = async (url,countryId,data_id) => {
  axios
  .get(url)
  .then( async response => {
    let { name, cover, thumbnail, birthday, realname, biography } = response.data.data;

    let newArtist =  new Artist({
      data_id,
      fullName: realname,
      nickName: name,
      thumbnail,
      avatar: cover, 
      dob: birthday, 
      country: [countryId], 
      history: biography, 
      songs:[]
    });

    await newArtist.save( err => {
      if(err) {
        console.log("ADD ARTIST FORM ZING FAIL",{err:`save ${name} fail - ${err}`, msg: "Fail"});
      } else {
        console.log("ADD ARTIST FORM ZING SUCCESS",{err:`save id ${data_id} name: ${name} success - ${err}`, msg: "Success"});
      }
    });
  });

};



module.exports = async (request, _response) => {
  let {
    urlCountry,
    api_key,
    ctime,
    sig,
    countryZ
  } =  request.body;
  
  axios.get(urlCountry).then(response=>{
    let { items } = response.data.data;
    // get current artist data_id:
    ObjId.find({}, async (err,data) => {
      console.log(data);
      let data_id = data[0].artistId;

      for (let element of items) {
        let {link} = element;
        data_id  = generateObjId(data_id);
        link = link.replace("/nghe-si/","");
        await getArtistItem(`https://beta.mp3.zing.vn/api/artist/get-detail?alias=${link}&ctime=${ctime}&sig=${sig}&api_key=${api_key}`,countryZ.value,data_id);      
      };

      data[0].set({ artistId:data_id });
      data[0].save((err, updateddata) => console.log(updateddata));
    });      
    console.log("ADD ARTIST FROM ZING SUCCESS",{err:null, msg: "Success"});
    _response.status(200).json({err:null, msg: "Success",  data: { noti: ["Add artist from ZING successfully"]}});
  });
};





