const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;


const SongSchema = new mongoose.Schema({
  data_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  idUserUpload: {
    type: Types.ObjectId,
    required: false,
    default: null
  },
  thumbnail: {
    type: String,
    required: false,
    default: "http://static-zmp3.zadn.vn/skins/zmp3-v5.1/images/default2/1190x350.jpg"
  }, 
  audio: {
    _128: {
      type: String,
      required: false,
      default: null
    },
    _320: {
      type: String,
      required: false,
      default: null,
    },    
    lossless: {
      type: String,
      required: false,
      default: null,
    },
    lyric: {
      type: String,
      required: false,
      default: null
    }
  },
  artists: [],
  creationDate: {
    type: Number,
    default: Date.now()
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  userLike: [],
  typeSong: []

},{collection: 'song'}); // prevent 'song' collection transform to 'songs'

const videoSchema = new mongoose.Schema({
  data_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  idUserUpload: {
    type: Types.ObjectId,
    required: false,
    default: null
  },
  thumbnail: {
    type: String,
    required: false,
    default: "http://static-zmp3.zadn.vn/skins/zmp3-v5.1/images/default2/1190x350.jpg"
  },
  video: {
    _360: {
      type: String,
      required: false,
      default: null
    },
    _480: {
      type: String,
      required: false,
      default: null,
    },    
    _720: {
      type: String,
      required: false,
      default: null,
    },
    _1080: {
      type: String,
      required: false,
      default: null,
    },
    lyric: {
      type: String,
      required: false,
      default: null
    }
  },
  artists: [],
  creationDate: {
    type: Number,
    default: Date.now()
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  userLike: [],
  typeSong: []

},{collection: 'video'}); // prevent 'song' collection transform to 'songs'


const ArtistSchema = new mongoose.Schema({
  data_id: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: false
  },
  nickName: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    default: "https://phpsound.com/demo/thumb.php?src=default.png&t=a&w=112&h=112",
    required: false
  },
  thumbnail: {
    type: String,
    default: "http://static-zmp3.zadn.vn/skins/zmp3-v5.1/images/default2/1190x350.jpg",
    required: false
  },
  gender: {
    type: Number,
    min: 0,
    max: 1,
    default: 0 ,// 0: female - 1: male
    required: false
  },
  dob: { // date of birth
    type: String,
    default: '01/01/1990', // 01/01/1990
    required: false
  },
  country: [],
  story: {
    type: String,
    required: false
  },
  songs: []
  
},{collection: 'artist'}); // prevent 'song' collection transform to 'songs'

const countrySchema = new mongoose.Schema({
  data_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  code: {
    type: String
  }
},{collection: 'country'});

const songTypeSchema = new mongoose.Schema({
  data_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  code: {
    type: String
  }
},{collection: 'songType'});

const UserSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true,
    default: ""
  },
  password:{
    type: String,
    required: true,
    default: ""
  },
  friends:{
    type: Array,
  },
  listenHistory:{
    type: Array,
  },
  likedMusics:{
    type: Array,
  },
  downloadedMusic:{
    type: Array,
  }
},{collection:'user'})

const SchemaObjId = new mongoose.Schema({
  artistId: String,
  songId: String,
  countryId: String,
  songTypeId: String,
  userId: String
},{collation:'schemaObjId'})

const SongType =  mongoose.model('songType',songTypeSchema);
const Country =  mongoose.model('country',countrySchema);
const Artist =  mongoose.model('artist',ArtistSchema);
const Song =  mongoose.model('song',SongSchema);
const Video =  mongoose.model('video',videoSchema);
const User = mongoose.model('user', UserSchema);
const ObjId = mongoose.model('schemaObjId', SchemaObjId);

module.exports = {
  Country,
  Artist,
  Song,
  SongType,
  User,
  ObjId,
  Video
};
