<template>
  <div class="nav">
    <div class="icon" @click="goindex">
      霓虹
    </div>
    <div class="banner">
      <div class="head">
        <div class="head_item" v-for="item in head_item" @click="turntonav(item.id)">
          {{ item.name }}
        </div>
      </div>
      <div class="search">
        <el-input :placeholder=random_recommand v-model="questitle">
          <el-button slot="append" icon="el-icon-search" @click="searchques"></el-button>
        </el-input>
        <el-button @click="open">
          提问
        </el-button>
      </div>
      <div class="user">
        <img src="./icon/tongzhi.svg" alt="" @click="shownoticeok">
        <img src="./icon/duihua.svg" alt="" @click="turntomessage">
        <img :src="this.$store.state.icon" alt="" @click="gotoperindex" v-if="this.$store.state.islogin">
        <span v-if="!this.$store.state.islogin" @click="gotoperindex">登陆</span>
      </div>
    </div>
    <div class="mask" v-show="showquestion">
      <div class="div_question">
        <p @click="closequestion" class="but_close">X</p>
        <h4><span><img src="./icon/neon.jpg" alt=""></span>写下你的问题，准确地描述问题更容易得到解答</h4>
        <div class="title"><input type="text" v-model="title"></div>
        <textarea name="" id="" cols="52" rows="6" v-model="intro"></textarea>
        <div ref="topic" class="topic">
          <input type="text" v-for="(item,index) in topic" v-model="topic[index]" class="topic_item">
          <span @click="moretopic">绑定话题</span>
        </div>
        <p>
          <el-button @click="gotoquestion">提出问题</el-button>
        </p>
      </div>
    </div>
    <div v-if="showuserselect"  class="userselect">
      <p @click="turntouserindex"><span><img src="./icon/主页.svg" alt=""></span> 我的主页</p>
      <p @click="turntocreator"><span><img src="./icon/创作中心.svg" alt=""></span>创作中心</p>
      <p @click="quit"><span><img src="./icon/退出.svg" alt=""></span>退出</p>
    </div>
    <div class="noticebox" v-if="shownotice">
      <div class="notice_nav">
        <div class="icon_item" @click="shownoticecomment">
          <img src="./icon/评论.svg" alt="">
        </div>
        <div class="icon_item" @click="shownoticefuns">
          <img src="./icon/关注.svg" alt="">
        </div>
        <div class="icon_item" @click="shownoticeagree">
          <img src="./icon/赞同.svg" alt="">
        </div>
      </div>
      <div class="notice_body">
         <div class="notice_body_item" v-for="item in this.noticelist" v-show="showagreelist">
            {{item.user}} 赞同了你的回答 {{item.question}}
         </div>
        <div class="notice_body_item" v-for="item in this.noticelist" v-show="showcommentlist">
          {{item.user}} 回复了你关于 {{item.question}} 问题下的评论
        </div>
        <div class="notice_body_item" v-for="item in this.noticelist" v-show="showfunslist">
          {{item.funsid}}关注了你
        </div>
      </div>
    </div>
    <div class="noticenum" v-show="this.noticenum>0" @click="shownoticeok">
      {{noticenum}}
    </div>
    <div class="messagenum" v-show="this.messagenum>0" @click="turntomessage">
      {{messagenum}}
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'navs',
  data() {
    return {
      head_item: [],
      random_recommand: '这里是一个推荐的随机话题',
      showquestion: false,
      topic: [],
      title: '',
      intro: '',
      questitle: '',
      showuserselect: false,
      shownotice: false,
      noticelist:[],
      noticeagreelist:[],
      noticecommentlist:[],
      noticefunslist:[],
      noticenum:0,
      showagreelist:false,
      showcommentlist:false,
      showfunslist:false,
      agreenum:0,
      commentnum:0,
      funsnum:0,
      messagenum:0,
    }
  },
  methods: {
    getHeadItems() {
      axios
        .get('http://127.0.0.1:80/getHeadItems')
        .then(res => {
          this.head_item = res.data
        })
    },
    gotoperindex() {
      if (this.$store.state.islogin) {
        this.showuserselect = !this.showuserselect
      } else {
        this.$router.push('/login')
      }
    },
    goindex() {
      this.$router.push('/')
    },
    open() {
      this.showquestion = true
    },
    moretopic() {
      if (this.topic.length >= 3) {
        alert('你特么最多只能选择三个话题')
      } else {
        this.topic.push('')
      }

    },
    closequestion() {
      this.showquestion = false
    },
    gotoquestion() {
      axios
        .post(`http://127.0.0.1:80/newquestion?arthur=${this.$store.state.username}&title=${this.title}&intro=${this.intro}&topic=${this.topic}&icon=${this.$store.state.icon}`)
        .then(res => {
          if (res.data == 1) {
            this.$router.push({
              path: '/question',
              query: {
                title: this.title
              }
            }).catch(err => {
              console.log(666)
            })
          } else {
            alert('问题创建失败')
          }

        })

    },
    searchques() {
            this.$router.push({
              path: '/Search',
              query: {
                searchtitle : this.questitle
              }
            })

    },
    turntouserindex() {
      this.$router.push({
        path:'/Userindex',
        query:{
          username: this.$store.state.username
        }
      })
    },
    quit() {
      localStorage.removeItem("islogin");
      this.$router.push('/login')
    },
    getnoticeagree() {

      axios
        .get(`http://127.0.0.1:80/getnotice?userid=${this.$store.state.username}`)
        .then(res => {

          this.noticeagreelist = res.data
          for(let item of this.noticeagreelist){
            if(item.neednotice=='true'){
              this.agreenum++
            }
          }
          this.noticenum+=this.agreenum
        })
    },
    getnoticecomment() {

      axios
        .get(`http://127.0.0.1:80/getnoticecomment?userid=${this.$store.state.username}`)
        .then(res => {

          this.noticecommentlist = res.data

          for(let item of this.noticecommentlist){
            if(item.neednotice=='true'){
             this.commentnum++
            }
          }
          this.noticenum += this.commentnum
        })
    },
    getnoticefuns(userid) {

      axios
        .get(`http://127.0.0.1:80/getnoticefuns?userid=${userid}`)
        .then(res => {
          this.noticefunslist = res.data
          for(let item of this.noticefunslist){
            if(item.neednotice=='true'){
              this.funsnum++
            }
          }
          this.noticenum += this.funsnum;
        })
    },
    shownoticeok(){
      this.shownotice = !this.shownotice
      this.shownoticecomment()
    },
    shownoticecomment(){
      this.noticelist = this.noticecommentlist
      this.showagreelist  = false
      this.showcommentlist = true
      this.showfunslist = false;
      this.noticenum -=this.commentnum
      axios
      .get(`http://127.0.0.1:80/hasreadcomment?userid=${this.$store.state.username}`)
      .then(res=>{

      })

    },
    shownoticeagree(){
      this.noticelist = this.noticeagreelist
      this.showagreelist  = true
      this.showcommentlist = false
      this.showfunslist = false;
      this.noticenum-=this.agreenum
      axios
        .get(`http://127.0.0.1:80/hasreadagree?userid=${this.$store.state.username}`)
        .then(res=>{

        })
    },
    shownoticefuns(){
      this.noticelist = this.noticefunslist
      this.showfunslist = true;
      this.showagreelist  = false;
      this.showcommentlist = false;
      this.noticenum -=this.funsnum
      axios
        .get(`http://127.0.0.1:80/hasreadfuns?userid=${this.$store.state.userid}`)
        .then(res=>{

        })
    },
    turntomessage(){
      this.$router.push({
        path:'/Message',
      })
    },
    getnoticemessage(username){
      axios
      .get(`http://127.0.0.1:80/getmessagenum?username=${username}`)
      .then(res=>{
         this.messagenum = res.data
      })
    },
    turntonav(navid){
      if(navid==2){
        this.$router.push({
          path:'/Explore',
        })
      }else if(navid==0){
        this.$router.push('/')
      }
    },
    turntocreator(){
      this.$router.push({
        path:'/Creator'
      })
    }
  },
  mounted() {
    this.getHeadItems()
    this.getnoticeagree()
    this.getnoticecomment()
    this.getnoticefuns(this.$store.state.userid)
    this.getnoticemessage(this.$store.state.username)
  },



}
</script>

<style scoped lang="less">
@import './nav.less';

</style>
