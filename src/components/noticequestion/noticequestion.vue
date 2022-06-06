<template>

<div>
<div v-for="item in question" class="noticequestion">
 <p @click="searchques(item.name)">{{item.name}}</p>
</div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: '',
  props: [
   'username'
  ],
  data() {
    return {
     question:[],
    }
  },
  watch:{

  },
  methods: {
   getquestion(name){
     axios.get(`http://127.0.0.1:80/getnoticequestionlist?name=${name}`)
       .then(res=>{
         this.question = res.data
       })
   },
    searchques(name) {
      axios
        .post('http://127.0.0.1:80/queryquestion?title=' + name)
        .then(res => {
          if (res.data == 1) {
            this.$router.push({
              path: '/question',
              query: {
                title: name
              }
            }).catch(err => {
              console.log(666)
            })
          } else {
            alert('问题不存在')
          }

        })
    },
  },
  mounted() {
   this.getquestion(this.username)
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'noticequestion.less';
</style>
