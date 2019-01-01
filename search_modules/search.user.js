const jwt = require("jsonwebtoken");
const Database = require("../database")
require("dotenv").config();

// this is search for user:
module.exports = (req,res) => {
    let { uName, searchStr }  = req.body;
    let listUser = []
    console.log("user search string:", searchStr);
    
    // Database.User.find({}, function(err, users){
    //     if(err){

    //     }
    //     else{
    //         console.log(users)
    //         for(let i = 0; i < users.length; i++){
    //             if(users[i].name.toLowerCase().includes(searchStr.toLowerCase()) || users[i].userName.toLowerCase().includes(searchStr.toLowerCase())){
    //                 let userInfo ={
    //                     name: users[i].name,
    //                     DoB: users[i].DoB,
    //                     address: users[i].address,
    //                     numberOfFollower: users[i].follower.length,
    //                     followed: false, 
    //                 }
    //                 listUser.push(userInfo)
    //             }
    //         }
    //         res.status(200).json({ err: 0, msg: "Success", users: listUser})
    //     }
    // })


    let regexSearch = {
        userName: {
          $regex: `(?i)\w*${searchStr}`, // regex uppercase and lowercase maybe
          $options: 'g'
        },
      }
    
      let projection = {
        follower: { // just get 4 user follow
          $slice: 10
        },
        following:{
            $slice: 10
        }
      }
    
      Database.User
      .find(regexSearch, projection)
      .select("-password -userName -_id -downloadedMusic -likedMusics -listenHistory") // exclude password, _id, follower => get all field
      .limit(10) // only get 7 data
      .lean()
      .then(data => res.status(200).json({ err: null,msg: "Success", count: data.length,data})); // response data
  }