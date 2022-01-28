<template>

<div class="questionitemindex">
  <div class="questionitem_item" v-for="item in questionlist">
    <h3 @click="searchques(item.name)">{{item.name}}</h3>
    <p>{{item.intro}}</p>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: 'questionitem',
  props: [
     'username'
  ],
  data() {
    return {
       questionlist:[]
    }
  },
  watch:{

  },
  methods: {
     getquestionlist(username){
       axios
         .get(`http://127.0.0.1:80/getquestionlist?username=${username}`)
         .then(res=>{
           this.questionlist = res.data
         })
     },
    searchques(title){
      axios
        .post('http://127.0.0.1:80/queryquestion?title='+title)
        .then(res=>{
          if(res.data==1){
            this.$router.push({
              path:'/question',
              query:{
                title:title
              }
            }).catch(err=>{
              console.log(666)
            })
          }else{
            alert('问题不存在')
          }

        })
    },
  },
  mounted() {
   this.getquestionlist(this.$store.state.username)
  },



}
</script>

<style scoped lang="less">
@import 'questionitem.less';
</style>
