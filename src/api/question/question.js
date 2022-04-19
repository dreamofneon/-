
import axios from "axios";

function searchques(name){
  axios
    .post('http://127.0.0.1:80/queryquestion?title='+name)
    .then(res=>{
      if(res.data==1){
        this.$router.push({
          path:'/question',
          query:{
            title:name
          }
        }).catch(err=>{
          console.log(666)
        })
      }else{
        alert('问题不存在')
      }

    })
}

export {searchques}
