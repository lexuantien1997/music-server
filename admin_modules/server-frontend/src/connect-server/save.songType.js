import axios from "axios";

const addSongType = (dataSongType) => new Promise((resolve,reject) => {
  axios.post('http://localhost:5000/admin/utils/add-song-type',{dataSongType}).then(response => {
    let { msg, err } = response.data; 
    if(!err && msg == 'Success') resolve(true);
    resolve(false);
  }).catch(err => reject(false));  
});

export default addSongType;