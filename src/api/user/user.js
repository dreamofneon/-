
import axios from "axios";
function getuserinfo(username) {
  axios
    .post('http://127.0.0.1:80/queryuserinfobyname?id=' + username)
    .then(res => {

    })

}

export {getuserinfo}
