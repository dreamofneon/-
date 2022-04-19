<template>
  <div>
    <div class="head">
      <h3>数据总览</h3>
      <div class="head_body">
        <div class="left">
          流量
          <img src="./icon/流量.svg" alt="">
        </div>
        <div class="right">
          <div class="rightitem">
            <h3>热度总量</h3>
            {{this.creatordata.hot}}
          </div>
          <div class="rightitem">
            <h3>赞同总数</h3>
            {{this.creatordata.agreenum}}
          </div>
          <div class="rightitem">
            <h3>评论总数</h3>
            {{this.creatordata.commentnum}}
          </div>
          <div class="rightitem">
            <h3>粉丝总数</h3>
            {{this.creatordata.funs}}
          </div>
        </div>
      </div>
    </div>
    <div class="detail">

    </div>
  </div>
</template>

<script>

import axios from "axios";
import {getuserinfo} from "@/api/user/user";

export default {
  name: '',
  props: [],
  data() {
    return {
      user:{},
      creatordata:{}
    }
  },
  watch: {},
  methods: {
    getcreatordata(name){
      axios.get(`http://127.0.0.1:80/getcreatordata?name=${name}`)
        .then(res=>{
          this.creatordata =res.data
        })
    }
  },
  mounted() {
 this.getcreatordata(this.$store.state.username)
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'contentanalyse.less';
</style>
