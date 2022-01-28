<template>
  <div>
      <div class="noticeitem" v-for="item in starlist ">
           <div class="item_left" >
             <img :src="item.icon" alt="" @click="turntouserindex(item.name)">
           </div>
        <div class="item_right">
          <h3  @click="turntouserindex(item.name)">{{item.name}}</h3>
          <p>{{item.intro}} <span>关注者:{{item.funs}}</span> <span> 回答:{{item.answer}}</span></p>
        </div>
      </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'notice',
  props: [
    'userid',

  ],
  data() {
    return {
      userid:'',
      starlist:[],
    }
  },
  watch: {},
  methods: {
    getnoticelist(userid){
      axios.get(`http://127.0.0.1:80/getnoticelist?userid=${userid}`)
      .then(res=>{
        this.starlist = res.data
      })
    },
    turntouserindex(username) {
      this.$router.push({
        path:'/Userindex',
        query:{
          username:username,
        }
      })

    }
  },
  mounted() {
    this.getnoticelist(this.$store.state.userid)
  },


}
</script>

<style scoped lang="less">
@import 'notice.less';
</style>
