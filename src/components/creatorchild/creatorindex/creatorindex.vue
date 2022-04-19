<template>

  <div class="creatorindex">
    <div class="middle">
      <div class="level">
        <h3>创作等级 <p>查看等级说明></p></h3>
        <div class="progress">
          <el-progress :percentage="this.user.exp/(this.user.level*50)"></el-progress>
          <h4>您当前的等级为{{this.user.level}}，还差{{this.user.level*5000-this.user.exp}}分则可升级为{{this.user.level+1}}</h4>
          <p> 升级解锁权益</p>
        </div>
        <div class="entitlement">

          <div class="entitlementitem">
            <img src="./icon/LV1.svg" alt="">
             <p>发布回答</p>
          </div>
          <div class="entitlementitem">
            <img src="./icon/LV1.svg" alt="">
            <p>发布评论</p>
          </div>
          <div class="entitlementitem">
            <img src="./icon/LV1.svg" alt="">
            <p>提出问题</p>
          </div>
          <div class="entitlementitem">
            <img src="./icon/LV1.svg" alt="">
            <p>建立收藏</p>
          </div>
          <div class="entitlementitem">
            <img src="./icon/LV2.svg" alt="">
            <p>处理举报</p>
          </div>
          <div class="entitlementitem">
            <img src="./icon/LV3.svg" alt="">
            <p>发布公告</p>
          </div>
        </div>
      </div>
      <div class="datadetail">
        <h3>数据总览 <p>查看更多数据></p></h3>
        <div class="dataitem">
          <div class="datailitem">
            <h3>热度总数</h3>
            {{this.creatordata.hot}}
          </div>
          <div class="datailitem">
            <h3>赞同总数</h3>
            {{this.creatordata.agreenum}}
          </div>
          <div class="datailitem">
            <h3>评论总数</h3>
            {{this.creatordata.commentnum}}
          </div>
          <div class="datailitem">
            <h3>粉丝总数</h3>
            {{this.creatordata.funs}}
          </div>
        </div>
      </div>
    </div>
    <div class="last">
      <div class="announcement">
        <h3>公告栏 <p @click="gotoannounceindex">查看更多</p></h3>
        <h4 v-for="item in announce">
          <span @click="gotoannounceitem(item.title)">{{item.title}}</span><span>{{item.arthur}}</span>
        </h4>

      </div>
      <div class="announcement">
        <h3>热门问题 <p>查看更多</p></h3>
        <div class="hotitem" v-for="(item,index) in hot">
         <p @click="searchques(item.name)">
           <span>{{index+1}}</span>{{item.name}}
         </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {searchques} from "@/api/question/question";

export default {
  name: '',
  props: [],
  data() {
    return {
      hot:[],
      creatordata:{},
      user:{
        level:0,
        exp:5000
      },
      announce:[],
    }
  },
  watch: {},
  methods: {
    gethotquestion(){
      axios.get(` http://127.0.0.1:80/gethotquestion`)
        .then(res=>{
          this.hot = res.data
        })
    },
    getuserinfo(username) {
  axios
    .post('http://127.0.0.1:80/queryuserinfobyname?id=' + username)
    .then(res => {
         this.user = res.data[0]
    })

},
    searchques(name){
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
},
    getcreatordata(name){
      axios.get(`http://127.0.0.1:80/getcreatordata?name=${name}`)
        .then(res=>{
          this.creatordata =res.data
        })
    },
    getannounce(){
      axios.get(` http://127.0.0.1:80/getannounce`)
        .then(res=>{
          this.announce = res.data
        })
    },
    gotoannounceindex(){
      this.$router.push({
        path:'/announceindex'
      })
    },
    gotoannounceitem(name){
      this.$router.push({
        path:'/announceitem',
        query:{
          title : name
        }
      })
    }
  },
  mounted() {
    this.gethotquestion()
   this.getuserinfo(this.$store.state.username)
    this.getcreatordata(this.$store.state.username)
    this.getannounce()
  }
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'creatorindex.less';
</style>
