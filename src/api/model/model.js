
import axios from "axios";

function insertmodel(name,title){
  console.log(name)
  console.log(title)
  axios
    .post(`http://127.0.0.1:80/insertmodel?name=${name}&title=${title}`)
    .then(res=>{

    })
}
export {insertmodel}
