const express = require("express");
const router = express.Router();
const Database = require("../database")
const genareteId = require("../admin_modules/server-backend/generate-Id")

// const axios = require("axios");

// let data = {
//   a: 5,
//   b:6
// }
// axios.post(".../media/update-user",{ a, b}).then(rs => {

// });

//const songRoute = require('./src/routes');

// download a song
// router.use('/download',userClientRoute);

router.post("/user-sign-up", (request, response) => {
  let id = 'US0000'
  Database.User.find({}, function(err, users){
    console.log("start find all")
    if(err){
      console.log("Failed to get all users")
    }
    else{
      console.log(users)
      console.log(users == [])
      console.log(users === [])
      if(users.length != 0){
        id = users[users.length - 1].userId
        console.log("get lastest id: " + id)
      }
    }
  })
  let { uName, pass } = request.body;
  let user = new Database.User({
    userId: genareteId(id),
    userName: uName,
    password: pass,
  })
  Database.User.findOne({ userName: uName }, function (err, data) {
    console.log("asdasdasd")
    if (err) {
      console.log(err)
    }
    else {
      if (data == null){
        console.log("Create account: " + user)
      Database.User.create(user, function (err) {
        if (err) {
          console.log("save error")
          return handleError(err);
        }
        return response.status(200).json({ err: '0', msg: "Account successfully created" }); //err_code == 0 means none error
      });
      }
      else{
        console.log(data)
        console.log("Account exists")
        return response.status(200).json({ err: '1', msg: "Account already exists", acc: data });
      }
    }
  })
})

router.post("/update-user-password", (request, response) => {
  let { uName, newPassword } = request.body;
  Database.User.findOne({ userName: uName }, function (err, data) {
    if(err){
      console.log("Account unexists")
      return response.status(200).json({ err: '1', msg: "Account unexists" });
    }
    else{
      // edit password
      data.password = newPassword
      data.save(function(err){
        if (err){
          console.log("Failed to change password")
          return response.status(200).json({ err: '1', msg: "Failed to change password"});
        }
        else{
          console.log("User's password successfully changed!");
          return response.status(200).json({ err: '0', msg: "User's password successfully changed!", acc: data });
        }
      })
    }
  })
});

router.post("/delete-user", (request, response) => {
  let {uName} = request.body
  Database.User.findOne({userName: uName}, function(err, user){
    if(err){
      console.log("Cannot find user to delete")
      return response.status(200).json({ err: '1', msg: "Cannot find user to delete"});
    }
    else{
      user.remove(function(err){
        if (err){
          console.log("Failed to delete user")
          return response.status(200).json({ err: '1', msg: "Failed to delete user"});
        }
        else{
          console.log("User successfully deleted!")
          return response.status(200).json({ err: '0', msg: "User successfully deleted!"});
        }
      })
    }
  })
})

router.post("/user-like-music", (request, response) => {
  let {uName, musicId} = request.body
  Database.User.findOne({userName: uName}, function(err, user){
    if(err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.likedMusics.push(musicId)
      user.save(function(err){
        if(err){
          console.log("Failed to like music: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to like music: " + musicId});
        }
        else{
          console.log("Successfully liked music: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully liked music: " + musicId});
        }
      })
    }
  })
})

router.post("/user-unlike-music", (request, response) => {
  let {uName, musicId} = request.body
  Database.User.findOne({userName: uName}, function(err, user){
    if(err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.likedMusics.remove(musicId)
      user.save(function(err){
        if(err){
          console.log("Failed to unlike music: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to unlike music: " + musicId});
        }
        else{
          console.log("Successfully liked music: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully unlike music: " + musicId});
        }
      })
    }
  })
})

router.post("/user-add-history-music", (request, response) => {
  let {uName, musicId} = request.body
  Database.User.findOne({userName: uName}, function(err, user){
    if(err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.listenHistory.push(musicId)
      user.save(function(err){
        if(err){
          console.log("Failed to add music to history: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to add music to history: " + musicId});
        }
        else{
          console.log("Successfully add music to history: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully add music to history: " + musicId});
        }
      })
    }
  })
})

router.post("/user-delete-history-music", (request, response) => {
  let {uName, musicId} = request.body
  Database.User.findOne({userName: uName}, function(err, user){
    if(err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.listenHistory.remove(musicId)
      user.save(function(err){
        if(err){
          console.log("Failed to delete music from history: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to delete music from history: " + musicId});
        }
        else{
          console.log("Successfully delete music from history: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully delete music from history: " + musicId});
        }
      })
    }
  })
})

router.post("/user-add-downloaded-music", (request, response) => {
  let {uName, musicId} = request.body
  Database.User.findOne({userName: uName}, function(err, user){
    if(err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.downloadedMusic.push(musicId)
      user.save(function(err){
        if(err){
          console.log("Failed to add music to downloaded-music: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to add music to downloaded-music: " + musicId});
        }
        else{
          console.log("Successfully add music to downloaded-music: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully add music to downloaded-music: " + musicId});
        }
      })
    }
  })
})

router.post("/user-delete-downloaded-music", (request, response) => {
  let testUser = new Database.User({
    userName: "thong",
    password: "thong",
    likedMusics:[
      "mId1", "mId2", "mId3", "mId4"
    ],
    listenHistory:[
      "mId1", "mId2", "mId3", "mId4"
    ],
    downloadedMusic:[
      "mId1", "mId2", "mId3", "mId4"
    ]
  })

  let {uName, musicId} = request.body
  //testUser.downloadedMusic.remove(musicId)
  //return response.status(200).json({ err: '0', msg: "Successfully add music to downloaded-music: " + musicId, testUser});

  Database.User.findOne({userName: uName}, function(err, user){
    if(err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.downloadedMusic.remove(musicId)
      user.save(function(err){
        if(err){
          console.log("Failed to delete music from downloaded-music: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to delete music from downloaded-music: " + musicId});
        }
        else{
          console.log("Successfully add music to downloaded-music: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully deleted music from downloaded-music: " + musicId});
        }
      })
    }
  })
})

router.post("/user-follow", (request, response) => {
  let {uName, uNameFollow} = request.body
  Database.User.findOne({uName: uName}, function(err, user){
    if (err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.follower.push(uNameFollow)
      user.save(function(err){
        if(err){
          console.log("Failed to follow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to follow: " + uNameFollow});
        }
        else{
          console.log("Successfully followed: " + uNameFollow)
          return response.status(200).json({ err: '0', msg: "Successfully followed: " + uNameFollow});
        }
      })
    }
  })
})

router.post("/user-unfollow", (request, response) => {
  let {uName, uNameFollow} = request.body
  Database.User.findOne({uName: uName}, function(err, user){
    if (err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.follower.remove(uNameFollow)
      user.save(function(err){
        if(err){
          console.log("Failed to unfollow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to unfollow: " + uNameFollow});
        }
        else{
          console.log("Successfully followed: " + uNameFollow)
          return response.status(200).json({ err: '0', msg: "Successfully unfollowed: " + uNameFollow});
        }
      })
    }
  })
})

router.post("/user-following", (request, response) => {
  let {uName, uNameFollow} = request.body
  Database.User.findOne({uName: uName}, function(err, user){
    if (err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.following.push(uNameFollow)
      user.save(function(err){
        if(err){
          console.log("Failed to follow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to follow: " + uNameFollow});
        }
        else{
          console.log("Successfully followed: " + uNameFollow)
          return response.status(200).json({ err: '0', msg: "Successfully followed: " + uNameFollow});
        }
      })
    }
  })
})

router.post("/user-unfollowing", (request, response) => {
  let {uName, uNameFollow} = request.body
  Database.User.findOne({uName: uName}, function(err, user){
    if (err){
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName});
    }
    else{
      user.following.remove(uNameFollow)
      user.save(function(err){
        if(err){
          console.log("Failed to follow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to follow: " + uNameFollow});
        }
        else{
          console.log("Successfully followed: " + uNameFollow)
          return response.status(200).json({ err: '0', msg: "Successfully followed: " + uNameFollow});
        }
      })
    }
  })
})

// get a song info
// router.use('/get-source',userClientRoute);

module.exports = router;