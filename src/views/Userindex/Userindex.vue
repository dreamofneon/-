<template>
  <div>
    <Nav></Nav>
    <div class="userindex">

      <div class="userinfo">
        <div class="cover">
          <img src="./icon/img.png" alt="">
        </div>
        <div class="body">
          <div class="left">
            <div class="img_box">
              <img :src="this.userinfo.icon" alt="">
            </div>
          </div>
          <div class="right">
            <div class="intro">
              <h1>{{ this.userinfo.name }} <span> {{ this.userinfo.intro }}</span></h1>
              <h3>性别:{{ this.userinfo.sex }}</h3>
              <h3 v-if="showmore">职业:{{ this.userinfo.job }}</h3>
              <p v-if="!showmore"><span @click="()=>{this.showmore=!showmore}">↓ 查看更多资料</span> <span><button
                @click="turntoedit($store.state.username)">编辑个人资料</button></span></p>
              <p v-if="showmore"><span @click="()=>{this.showmore=!showmore}">收起</span> <span><button
                @click="turntoedit($store.state.username)">编辑个人资料</button></span></p>
            </div>


          </div>
        </div>

      </div>
      <div class="outerbody">
        <div class="articleinfo">
          <div class="nav">
            <span v-for="item in navlist" @click="changenav(item)">{{ item }}</span>
          </div>
          <div class="body">
            <p v-if="this.userinfo.name === this.$store.state.username">我的{{ nav }}</p>
            <p v-if="this.userinfo.name !== this.$store.state.username">他的{{ nav }}</p>
            <div class="article_box" v-if="nav=='回答'">
              <div class="article" v-for="item in article_array">
                <Article :articleform="item"></Article>
              </div>
            </div>
            <div class="question" v-if="nav==='提问'">
              <questionitem :username="userinfo.name"></questionitem>
            </div>
            <div class="collection" v-if="nav==='收藏'">
              <collectionitem :username='userinfo.name'></collectionitem>
            </div>
            <div class="notice" v-if="nav==='关注'">
              <p><span @click="noticeuser">关注用户</span>  <span @click="noticequestion">关注问题</span></p>
              <notice :username="userinfo.id" v-if="showuser"></notice>
              <noticequestion :username="userinfo.name" v-if="!showuser"></noticequestion>
            </div>
          </div>
        </div>
        <div class="personinfo">
          <div class="create">
            <div class="create_nav">
              <p><span>
             <img src="./icon/human.svg" alt=""> 创作中心 Lv{{ level }}
        </span>
                <span>草稿箱 ( )</span></p>
            </div>
            <div class="scroll">
              <p>
                创作中心可以帮助您更好的管理内容，通过创作中心您可以精准快速的查找到您所感兴趣的相关话题进行回答，感谢您为社区做出的贡献。
              </p>
            </div>
            <button class="createe">进入创作中心</button>
          </div>
          <div class="readtimes">
            <div class="nav">
              <p>个人成就</p>
            </div>
            <div class="read_body">
              <h3><span><img src="./icon/赞.svg" alt=""></span> 获得{{ this.agreenum }}次赞同</h3>
              <h3><span><img src="./icon/编辑.svg" alt=""> </span> 参与{{ this.answersnum }}次共同编辑</h3>
            </div>
          </div>
          <div class="funsnum">
            <div class="funsnum_left">
              关注了 <span>
             {{ this.starsnum }}
          </span>
            </div>
            <div class="funsnum_left">
              关注者 <span>
            {{ this.userinfo.funs }}
          </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<script>

import axios from "axios";
import Nav from "@/views/Nav/Nav";
import Article from "@/components/Article/Article";
import questionitem from "@/components/questionitem/questionitem";
import collectionitem from "@/components/collectionitem/collectionitem";
import noticequestion from "@/components/noticequestion/noticequestion";
import notice from "@/components/notice/notice";

export default {
  name: 'Userindex',
  components: {
    Nav, Article, questionitem, collectionitem, notice,noticequestion
  },
  data() {
    return {
      article_array: [],
      navlist: [
        '回答', '提问','收藏', '关注'
      ],
      userinfo: {},
      level: 4,
      userid: '',
      agreenum: 0,
      starsnum: 0,
      answersnum: 0,
      showmore: false,
      nav: '回答',
      showuser:true,
    }
  },
  methods: {
    noticeuser(){
      this.showuser = true
    },
    noticequestion(){
     this.showuser = false
    },
    getArtList() {
      axios
        .get('http://127.0.0.1:80/getuserartlist?arthur=' + this.$store.state.username)
        .then(res => {
          console.log(res)
          for (let item of res.data) {
            item.nexttext = item.text.substring(0, 80)
            if (item.answer.includes('img')) {
              item.nexttext = '[图片]' + item.text
            }
          }
          this.article_array = res.data
        })
    },
    getuserinfo(username) {
      axios
        .post('http://127.0.0.1:80/queryuserinfobyname?id=' + username)
        .then(res => {
          console.log(res)
          this.userinfo = res.data[0]
        })
    },
    getagreenum(username) {
      axios
        .get(`http://127.0.0.1:80/getnotice?userid=${username}`)
        .then(res => {
          this.agreenum = res.data.length
        })
    },
    getstars(userid) {
      axios
        .get(`http://127.0.0.1:80/getstars?userid=${userid}`)
        .then(res => {
          this.starsnum = res.data
        })
    },

    getanswersnum(userid) {
      axios
        .get(`http://127.0.0.1:80/getanswersnum?userid=${userid}`)
        .then(res => {
          this.answersnum = res.data
        })
    },
    turntoedit(username) {
      this.$router.push({
        path: `/Edit?`,
        query: {
          userid: username,
        }
      })
    },
    changenav(nav) {
      this.nav = nav
    }

  },
  mounted() {
    if(this.$route.query.nav){
      this.nav = this.$route.query.nav
    }
    this.userid = this.$route.query.username;
    this.getArtList();
    this.getuserinfo(this.userid);
    this.getagreenum(this.userid);
    this.getstars(this.$store.state.userid)
    this.getanswersnum(this.userid)

  },


}
</script>

<style scoped lang="less">
@import "Userindex.less";
</style>
