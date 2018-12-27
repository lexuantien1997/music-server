const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");
const axios = require("axios");


const artistExist = async (name) => {

  const data = await Artist.findOne({nickName: name.trim()});
  if(data) return data.data_id;
  return 1;
};

module.exports = async (request,response) => {
  let {
    artistUrl, // beta url
    count
  } = request.body;

  await axios.get(artistUrl).then( async (res) => {
    let { items } = res.data.data.song;

    await ObjId.find({},async (err,data) => {

      // console.log(data);
      let data_id = data[0].songId;
     

      for(let i = 0 ; i < count ; i++ ) {

        // check artist exist or not
        // if exist -> get array id
        // else generate id add add artist
        let { artists, title, thumbnail_medium, lyric, listen, created_at, link } = items[i];
        let artistId = [];
        let _128;

        //  add array artist ID
        console.log(artists, artists.length);
        // for(let ii = 0;ii< artists.length; ii++) {
        //   artistId.push(artistExist(artists[ii].name));           
        // }

        for(let item of artists) {

          let a = await artistExist(item.name);
          artistId.push(a);
        }

        // artists.forEach(async function(item, i) {
        //   artistId.push(artistExist(item.name));            
        // });
        
        console.log(artistId, title);

        // get url song to get : source { _128, 320 }
        let url = `https://mp3.zing.vn${link}`;

        data_id  = generateObjId(data_id);

        await axios
          .get(url)
          .then(async res => {
            let html = res.data;
            let regex = /key=.{33}/g; 
            let key = (html.toString().match(regex))[0];
            key = key.replace("key=","");
            console.log(key);
            await axios
              .get(`https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${key}`)
              .then( async res =>{
                // console.log(res.data.data.source['128']);
                _128  = res.data.data.source['128'];
              });
            });


        let newSong = 
          new Song({
            data_id,
            name: title,
            thumbnail: thumbnail_medium,
            audio: {
              _128,
              _320:_128,    
              lossless:'',
              lyric
            },
            creationDate: created_at,
            artists: artistId,
            typeSong: [],
            userLike: []
          });
      
        await newSong.save( err => {
          if(err != null) {
            console.log("ADD SONG FAIL",{err:`save ${newSong} fail - ${err}`, msg: "Fail"});
            return response.status(200).json({err:`save ${newSong} fail - ${err}`, msg: "Fail",  data: {noti: ["Add song fail"]}});
          } else {
            console.log("ADD SONG SUCCESS",{err:`name: ${title}`, msg: "Success",  data: {noti: ["Add song Successfully"]}});
          }
        });
        
      }
    
      data[0].set({ songId:data_id });
      data[0].save((err, updateddata) => console.log(updateddata));

      console.log("ADD SONG FROM ZING SUCCESS",{err:null, msg: "Success"});
      response.status(200).json({err:null, msg: "Success", data: {noti: ["Add song successfully"]}});
    });

  });

};