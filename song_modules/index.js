const express = require("express");
const router = express.Router();
const Database = require("../database")
const genareteId = require("../admin_modules/server-backend/generate-Id")

function LogFindError(err, uName) {
  console.log("Error when finding user: " + uName)
  console.log(err)
}

router.post("/user-sign-up", (request, response) => {
  let id = 'US0000'
  Database.User.find({}, function (err, users) {
    console.log("start find all")
    if (err) {
      console.log("Error when finding all user")
      console.log(err)
      return response.status(200).json({ err: '1', msg: "Error when finding all user" });
    }
    else {
      console.log(users)
      console.log(users == [])
      console.log(users === [])
      if (users.length != 0) {
        id = users[users.length - 1].userId
        console.log("get lastest id: " + id)
      }
    }
  })
  let { uName, pass } = request.body;

  Database.User.findOne({ userName: uName }, function (err, data) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if (data == null) {
        let user = new Database.User({
          userId: genareteId(id),
          userName: uName,
          password: pass,
        })
        console.log("Create account: " + user)
        Database.User.create(user, function (err) {
          if (err) {
            console.log("Save user error: " + user)
            console.log(err)
            return response.status(200).json({ err: '1', msg: "Save user error: " + user });
          }
          return response.status(200).json({ err: '0', msg: "Account successfully created" }); //err_code == 0 means none error
        });
      }
      else {
        console.log(data)
        console.log("Account exists")
        return response.status(200).json({ err: '1', msg: "Account already exists", acc: data });
      }
    }
  })
})

router.post("/user-get-info", (request, response) => {
  let { uName } = request.body;
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if (user != null) {
        return response.status(200).json({ err: '0', msg: "Get user info successfully!", acc: user });
      }
      else {
        console.log("Cannot find user to get info: " + uName)
        return response.status(200).json({ err: '1', msg: "Cannot find user to get info: " + uName });
      }
    }
  })
})

router.post("/user-change-password", (request, response) => {
  let { uName, newPassword } = request.body;
  Database.User.findOne({ userName: uName }, function (err, data) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if (data != null) {
        // edit password
        data.password = newPassword
        data.save(function (err) {
          if (err) {
            console.log("Failed to change user password: " + uName)
            return response.status(200).json({ err: '1', msg: "Failed to change user password: " + uName });
          }
          else {
            console.log("User's password successfully changed!");
            return response.status(200).json({ err: '0', msg: "User's password successfully changed!", acc: data });
          }
        })
      }
      else {
        console.log("Cannot find user to change password: " + uName)
        return response.status(200).json({ err: '1', msg: "Cannot find user to change password: " + uName });
      }
    }
  })
});

router.post("/user-change-name", (request, response) => {
  let { uName, newName } = request.body;
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if (user != null) {
        // edit password
        user.name = newName
        user.save(function (err) {
          if (err) {
            console.log("Failed to change user display name: " + uName)
            return response.status(200).json({ err: '1', msg: "Failed to change user display name: " + uName });
          }
          else {
            console.log("User's display name successfully changed!");
            return response.status(200).json({ err: '0', msg: "User's display name successfully changed!", acc: user });
          }
        })
      }
      else {
        console.log("Cannot find user to change display name: " + uName)
        return response.status(200).json({ err: '1', msg: "Cannot find user to change display name: " + uName });
      }
    }
  })
})

router.post("/user-change-DoB", (request, response) => {
  let { uName, newDoB } = request.body;
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if (user != null) {
        // edit password
        user.DoB = newDoB
        user.save(function (err) {
          if (err) {
            console.log("Failed to change user DoB: " + uName)
            return response.status(200).json({ err: '1', msg: "Failed to change user DoB: " + uName });
          }
          else {
            console.log("User's DoB successfully changed!");
            return response.status(200).json({ err: '0', msg: "User's DoB successfully changed!", acc: user });
          }
        })
      }
      else {
        console.log("Cannot find user to change DoB: " + uName)
        return response.status(200).json({ err: '1', msg: "Cannot find user to change DoB: " + uName });
      }
    }
  })
})

router.post("/user-change-phone-number", (request, response) => {
  let { uName, newPhoneNumber } = request.body;
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if (user != null) {
        // edit password
        user.phoneNumber = newPhoneNumber
        user.save(function (err) {
          if (err) {
            console.log("Failed to change user phone number: " + uName)
            return response.status(200).json({ err: '1', msg: "Failed to change user phone number: " + uName });
          }
          else {
            console.log("User's phone numer successfully changed!");
            return response.status(200).json({ err: '0', msg: "User's phone number successfully changed!", acc: user });
          }
        })
      }
      else {
        console.log("Cannot find user to change phone number: " + uName)
        return response.status(200).json({ err: '1', msg: "Cannot find user to change phone number: " + uName });
      }
    }
  })
})

router.post("/user-change-address", (request, response) => {
  let { uName, newAddress } = request.body;
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if (user != null) {
        // edit password
        user.address = newAddress
        user.save(function (err) {
          if (err) {
            console.log("Failed to change user address: " + uName)
            return response.status(200).json({ err: '1', msg: "Failed to change user address: " + uName });
          }
          else {
            console.log("User's address successfully changed!");
            return response.status(200).json({ err: '0', msg: "User's address successfully changed!", acc: user });
          }
        })
      }
      else {
        console.log("Cannot find user to change address: " + uName)
        return response.status(200).json({ err: '1', msg: "Cannot find user to change address: " + uName });
      }
    }
  })
})

router.post("/user-delete", (request, response) => {
  let { uName } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user to delete: " +uName });
    }
    else {
      if (user != null) {
        user.remove(function (err) {
          if (err) {
            console.log("Failed to delete user: " + uName)
            return response.status(200).json({ err: '1', msg: "Failed to delete user: " +uName });
          }
          else {
            console.log("User successfully deleted!")
            return response.status(200).json({ err: '0', msg: "User successfully deleted!" });
          }
        })
      }
      else {
        console.log("Cannot find user to delete: " + uName)
        return response.status(200).json({ err: '1', msg: "Cannot find user to delete: " + uName });
      }
    }
  })
})

router.post("/user-like-music", (request, response) => {
  let { uName, musicId } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user to add like music: " + uName });
    }
    else {
      if(user != null){
        if(!user.likedMusics.includes(musicId)){
          user.likedMusics.push(musicId)
        }
        else{
          console.log(musicId + " has contained in like list")
          return response.status(200).json({ err: '1', msg: musicId + " has contained in like list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to like music: " + uName + " " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to like music: " + uName + " " + musicId });
        }
        else {
          console.log("Successfully liked music: " + uName + " " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully liked music: " + uName + " " + musicId });
        }
      })
      }
      else{
        console.log("Cannot find user to add liked music: " + uName + " " + musicId)
        return response.status(200).json({ err: '1', msg: "Cannot find user to add liked music: " + uName + " " + musicId });
      }
    }
  })
})

router.post("/user-unlike-music", (request, response) => {
  let { uName, musicId } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user to unlike music: " + uName });
    }
    else {
      if(user != null){
        if(user.likedMusics.includes(musicId)){
          user.likedMusics.remove(musicId)
        }
        else{
          console.log(musicId + " does not contain in like list")
          return response.status(200).json({ err: '1', msg: musicId + " does not contain in like list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to unlike music: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to unlike music: " + musicId });
        }
        else {
          console.log("Successfully unliked music: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully unlike music: " + musicId });
        }
      })
      }
      else{
        console.log("Cannot find user to delete unlike music: " + uName + " " + musicId)
        return response.status(200).json({ err: '0', msg: "Cannot find user to delete unlike music: " + uName + " " + musicId});
      }
    }
  })
})

router.post("/user-add-history-music", (request, response) => {
  let { uName, musicId } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user to add history music: " + uName });
    }
    else {
      if(user != null){
        if(!user.listenHistory.includes(musicId)){
          user.listenHistory.push(musicId)
        }
        else{
          console.log(musicId + " has contained in listen history")
          return response.status(200).json({ err: '1', msg: " has contained in listen history: " + musicId });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to add music to history: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to add music to history: " + musicId });
        }
        else {
          console.log("Successfully add music to history: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully add music to history: " + musicId });
        }
      })
      }
      else{
        console.log("Cannot find user to add history music: " + uName + " " + musicId)
        return response.status(200).json({ err: '1', msg: "Cannot find user to add history music: " + uName + " " + musicId });
      }
    }
  })
})

router.post("/user-delete-history-music", (request, response) => {
  let { uName, musicId } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user to delete history music: " + uName });
    }
    else {
      if(user){
        if(user.listenHistory.includes(musicId)){
          user.listenHistory.remove(musicId)
        }
        else{
          console.log(musicId + " does not contain in history list")
          return response.status(200).json({ err: '1', msg: musicId + " does not contain in history list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to delete music from history: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to delete music from history: " + musicId });
        }
        else {
          console.log("Successfully delete music from history: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully delete music from history: " + musicId });
        }
      })
      }
      else{
        console.log("Cannot find user to delete history music: " + uName + " " + musicId)
        return response.status(200).json({ err: '1', msg: "Cannot find user to delete history music: " + uName + " " + musicId });
      }
    }
  })
})

router.post("/user-add-downloaded-music", (request, response) => {
  let { uName, musicId } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user to add download music: " + uName });
    }
    else {
      if(user){
        if(!user.downloadedMusic.includes(musicId)){
          user.downloadedMusic.push(musicId)
        }
        else{
          console.log(musicId + " has contained in download list")
          return response.status(200).json({ err: '1', msg: musicId + " has contained in download list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to add music to downloaded-music: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to add music to downloaded-music: " + musicId });
        }
        else {
          console.log("Successfully add music to downloaded-music: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully add music to downloaded-music: " + musicId });
        }
      })
      }
      else{
        console.log("Cannot find user to add download music: " + uName + " " + musicId)
        return response.status(200).json({ err: '1', msg: "Cannot find user to add download music: " + uName + " " + musicId });
      }
    }
  })
})

router.post("/user-delete-downloaded-music", (request, response) => {
  let { uName, musicId } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      console.log("Cannot find user: " + uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName });
    }
    else {
      if(user){
        if(user.downloadedMusic.includes(musicId)){
          user.downloadedMusic.remove(musicId)
        }
        else{
          console.log(musicId + " does not contain in download list")
          return response.status(200).json({ err: '1', msg: musicId + " does not contain in download list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to delete music from downloaded-music: " + musicId)
          return response.status(200).json({ err: '1', msg: "Failed to delete music from downloaded-music: " + musicId });
        }
        else {
          console.log("Successfully add music to downloaded-music: " + musicId)
          return response.status(200).json({ err: '0', msg: "Successfully deleted music from downloaded-music: " + musicId });
        }
      })
      }
      else{
        console.log("Cannot find user to delete download music: " + uName + " " + musicId)
        return response.status(200).json({ err: '1', msg: "Cannot find user to delete download music: " + uName + " " + musicId });
      }
    }
  })
})

router.post("/user-follow", (request, response) => {
  let { uName, uNameFollow } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if(user){
        if(!user.following.includes(uNameFollow)){
          user.following.push(uNameFollow)
        }
        else{
          console.log(uNameFollow + " has contained in following list")
          return response.status(200).json({ err: '1', msg: uNameFollow + " has contained in following list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to follow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to follow: " + uNameFollow });
        }
        else {
          console.log("Successfully followed: " + uNameFollow)
          Database.User.findOne({userName: uNameFollow}, function(err, userFollow){
            if(err){
              LogFindError(err, uNameFollow)
              return response.status(200).json({ err: '1', msg: "Successfully add following but error when finding user: " + uNameFollow });
            }
            else{
              if(userFollow){
                if(!userFollow.follower.includes(uName)){
                  userFollow.follower.push(uName)
                }
                else{
                  console.log(uName + " has contained in follower list")
                  return response.status(200).json({ err: '1', msg: uName + " has contained in follower list" });
                }
                userFollow.save(function(err){
                  if (err) {
                    console.log("Successfully add following but failed to add follower to: " + uNameFollow)
                    return response.status(200).json({ err: '1', msg: "Successfully add following but failed to add follower to: " + uNameFollow });
                  }
                  else {
                    console.log("Successfully add following and Successfully added follower to: " + uNameFollow)
                    response.status(200).json({ err: '0', msg: "Successfully add following and Successfully added follower to: " + uNameFollow });
                  }
                })
              }
              else{
                console.log("Cannot find user to add follower: " + uName + " " + uNameFollow)
                return response.status(200).json({ err: '1', msg: "Cannot find user to add follower: " + uName + " " + uNameFollow });
              }
            }
          })
        }
      })
      }
      else{
        console.log("Cannot find user to add following: " + uName + " " + uNameFollow)
        return response.status(200).json({ err: '1', msg: "Cannot find user to add following: " + uName + " " + uNameFollow });
      }
    }
  })
})

router.post("/user-unfollow", (request, response) => {
  let { uName, uNameFollow } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Error when finding user: " + uName });
    }
    else {
      if(user){
        if(user.following.includes(uNameFollow)){
          user.following.remove(uNameFollow)
        }
        else{
          console.log(uNameFollow + " does not contain in following list")
          return response.status(200).json({ err: '1', msg: uNameFollow + " does not contain in following list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to unfollow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to unfollow: " + uNameFollow });
        }
        else {
          console.log("Successfully followed: " + uNameFollow)
          Database.User.findOne({userName: uNameFollow}, function(err, userFollow){
            if(err){
              LogFindError(err, uNameFollow)
              return response.status(200).json({ err: '1', msg: "Successfully add following but error when finding user: " + uNameFollow });
            }
            else{
              if(userFollow){
                if(userFollow.follower.includes(uName)){
                  userFollow.follower.remove(uName)
                }
                else{
                  console.log(uName + " does not contain in follower list")
                  return response.status(200).json({ err: '1', msg: uName + " does not contain in follower list" });
                }
                userFollow.save(function(err){
                  if (err) {
                    console.log("Successfully removed following but failed to remove follower to: " + uNameFollow)
                    return response.status(200).json({ err: '1', msg: "Successfully removed following but failed to removed follower to: " + uNameFollow });
                  }
                  else {
                    console.log("Successfully removed following and Successfully removed follower to: " + uNameFollow)
                    response.status(200).json({ err: '0', msg: "Successfully removed following and Successfully removed follower to: " + uNameFollow });
                  }
                })
              }
              else{
                console.log("Cannot find user to add follower: " + uName + " " + uNameFollow)
                return response.status(200).json({ err: '1', msg: "Cannot find user to add follower: " + uName + " " + uNameFollow });
              }
            }
          })
        }
      })
      }
      else{
        console.log("Cannot find user to remove following: " + uName + " " + uNameFollow)
        return response.status(200).json({ err: '1', msg: "Cannot find user to remove following: " + uName + " " + uNameFollow });
      }
    }
  })
})

router.post("/user-following", (request, response) => {
  let { uName, uNameFollow } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Cannot find user: " + uName });
    }
    else {
      if(user){
        if(!user.following.includes(uNameFollow)){
          user.following.push(uNameFollow)
        }
        else{
          console.log(uNameFollow + " has contained in following list")
          return response.status(200).json({ err: '1', msg: uNameFollow + " has contained in following list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to follow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to follow: " + uNameFollow });
        }
        else {
          console.log("Successfully followed: " + uNameFollow)
          return response.status(200).json({ err: '0', msg: "Successfully followed: " + uNameFollow });
        }
      })
      }
      else{
        console.log("Cannot find user to add following: " + uName + " " + uNameFollow)
        return response.status(200).json({ err: '1', msg: "Cannot find user to add following: " + uName + " " + uNameFollow });
      }
    }
  })
})

router.post("/user-unfollowing", (request, response) => {
  let { uName, uNameFollow } = request.body
  Database.User.findOne({ userName: uName }, function (err, user) {
    if (err) {
      LogFindError(err, uName)
      return response.status(200).json({ err: '1', msg: "Erro when finding user: " + uName });
    }
    else {
      if(user){
        if(user.following.includes(uNameFollow)){
          user.following.remove(uNameFollow)
        }
        else{
          console.log(uNameFollow + " does not contain in following list")
          return response.status(200).json({ err: '1', msg: uNameFollow + " does not contain in following list" });
        }
        user.save(function (err) {
        if (err) {
          console.log("Failed to unfollow: " + uNameFollow)
          return response.status(200).json({ err: '1', msg: "Failed to unfollow: " + uNameFollow });
        }
        else {
          console.log("Successfully unfollowed: " + uNameFollow)
          return response.status(200).json({ err: '0', msg: "Successfully unfollowed: " + uNameFollow });
        }
      })
      }
      else{
        console.log("Cannot find user to remove following: " + uName + " " + uNameFollow)
        return response.status(200).json({ err: '1', msg: "Cannot find user to remove following: " + uName + " " + uNameFollow });
      }
    }
  })
})

// get a song info
// router.use('/get-source',userClientRoute);

module.exports = router;