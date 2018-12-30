const { ObjId, Country, SongType, Artist, Song } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const axios = require("axios");

const generateObjId = require("../generate-Id");

const randomDate =  () => {
  return  Math.floor((Math.random()*27) + 1);
}

const randomMonth =  () => {
  return  Math.floor((Math.random()*12) + 1);
}

const randomYear =  () => {
  return  Math.floor((Math.random()*21) + 1980);
}

const randomBirthday = async () => {
  return await `${randomDate()} : ${randomMonth()} : ${randomYear()}`;
}

const getArtistItem = async (url,countryId,data_id) => {

  try {
    let response = await  axios.get(url);
    let { name, cover, thumbnail, realname, biography } = response.data.data;

    let newArtist =  new Artist({
      data_id,
      fullName: realname.trim(),
      nickName: name.trim() ,
      thumbnail,
      avatar: cover, 
      country: [countryId], 
      story: biography, 
      songs:[]
    });

    let artist = await newArtist.save();
    if(artist == null) 
      console.log("ADD ARTIST FORM ZING FAIL",{err:1, msg: "Fail"});
    else 
      console.log("ADD ARTIST FORM ZING SUCCESS",{err:1, msg: "Success"});
    
  } catch(err) {
    console.log(err); 
  }

};

module.exports = async (request, _response) => {

  try {

    let {
      urlCountry,
      api_key,
      ctime,
      sig,
      countryZ,
      count
    } =  request.body;
    count = parseInt(count);

    // get data id of artist:
    let data = await ObjId.find({});
    let data_id = data[0].artistId;
    
    // number artist you want to get
    for (let i = 0; i< count ; i++) { 
      const response = await axios.get(urlCountry.replace("start=0&count=20",`start=${i*10}`));
      let { items } = response.data.data;
      // get current artist data_id:
      for (let element of items) {
        let {link} = element;
        data_id  = generateObjId(data_id);
        link = link.replace("/nghe-si/","");
        await getArtistItem(`https://beta.mp3.zing.vn/api/artist/get-detail?alias=${link}&ctime=${ctime}&sig=${sig}&api_key=${api_key}`,countryZ.value,data_id);      
      };
    }

    data[0].set({ artistId:data_id });
    data[0].save((err, updateddata) => console.log(updateddata));

    console.log("ADD ARTIST FROM ZING SUCCESS",{err:null, msg: "Success"});
    _response.status(200).json({err:null, msg: "Success",  data: { noti: ["Add artist from ZING successfully"]}});

  } catch(err) {
    console.log(err); 
  }
};





