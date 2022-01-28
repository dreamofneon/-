import axios from "axios";

export const mixin = {
  data(){
    ren : ' 6666666666666666666666666'
  },
  created() {

  },
  methods:{
    insertmodel(title){
      axios
        .post(`http://127.0.0.1:80/insertmodel?name=${this.$store.state.username}&title=${title}`)
        .then(res=>{

        })
    }
  }
}
