import axios from "axios";

const getSongType = () => new Promise((resolve,reject) => {
 // alert(1);
  axios.get('http://localhost:5000/admin/utils/get-song-type').then(response => {
    let { msg, err, data } = response.data; 
    if(!err && msg == "Success" && data) resolve(data);
    resolve(null);
  }).catch(err => reject(err));  
});

export default getSongType;