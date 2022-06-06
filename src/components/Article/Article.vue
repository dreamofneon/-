<template>
  <div class="index">
    <div v-show="this.types!='question'">
      <h3 @click="searchques">{{ articleform.title }}</h3>
    </div>
    <div v-if="isshow" class="slot_nav">
      <div class="answer_icon" @click="turntouserindex(articleform.arthur)"
           @mouseover="showuserinfo(articleform.arthur)" @mouseleave="displayuserinfo()">
        <img :src="this.articleform.icon" alt="">
      </div>
      <div class="answer_info">
        <h3>{{ this.articleform.arthur }}</h3>
        <p>{{ this.articleform.arthurinfo }}</p>
      </div>
    </div>
    <div class="userinfo" v-if="showinfo" @mouseenter="showuserinfo(articleform.arthur)"
         @mouseleave="displayuserinfo()">
      <div class="userinfo_nav">
        <div class="userinfo_nav_left">
          <img :src="this.userinfo.icon" alt="">
        </div>
        <div class="userinfo_nav_right">
          <h3>{{ userinfo.name }}</h3>
          <p>{{ userinfo.intro }}</p>
        </div>

      </div>
      <div class="userinfo_body">
        <div class="userinfo_body_item">
          <p>回答</p>
          <h3>{{ userinfo.answer }}</h3>
        </div>
        <div class="userinfo_body_item">
          <p>关注者</p>
          <h3>{{ userinfo.funs }}</h3>
        </div>
      </div>
      <div class="userinfo_button">
        <button v-if="!this.isfuns" @click="befuns(userinfo.id,$store.state.userid)">关注</button>
        <button v-if="this.isfuns" @click="nobefuns(userinfo.id,$store.state.userid)">已关注</button>
        <button @click="turntomessage(userinfo.name)">私信</button>
      </div>
    </div>
    <div class="text" ref="text" v-html="articleform.nexttext">

    </div>
    <div v-if="this.types=='search'" class="slot_time">
      <p>{{ this.articleform.time }}</p>
    </div>
    <div v-if="this.types!='search'">
      <span v-if="!isshow"><a href="#" @click="showmore(articleform.title)">阅读全文</a></span>
      <span v-if="isshow"><a href="#" @click="showmore(articleform.title)">收起</a></span>
    </div>


    <div class="action">
      <button @click="agree(articleform.id)">
        <p v-show="!isagree"><img src="./icon/上箭头.svg" alt="">&nbsp赞同{{ agree_num }}</p>
        <p v-show="isagree"><img src="./icon/上箭头.svg" alt="">已赞同</p>
      </button>
      <button @click="disagree(articleform.id)">
        <p v-show="!isdisagree"><img src="./icon/下箭头.svg" alt=""></p>
        <p v-show="isdisagree"><img src="./icon/下箭头.svg" alt="">已反对</p>
      </button>
      <div class="action_item" @click="showcommen()">
        <div v-show="!showcomment&&comment_num>0">
          <img src="./icon/评论.svg" alt=""> {{ comment_num }}评论
        </div>
        <div v-show="!showcomment&&comment_num==0">
          添加评论
        </div>
        <div v-show="showcomment">
          收起评论
        </div>
      </div>
      <div class="action_item" @click="share(articleform.title)">
        <img src="./icon/共享.svg" alt=""> 分享
      </div>
      <div class="action_item" @click="showcollect(articleform.id)">
        <span><img src="./icon/收藏.svg" a lt="">收藏</span>
      </div>
      <div class="action_item" @click="addlike(articleform.id)">
        <div v-show="!islike">
          <img src="./icon/喜欢.svg" alt=""> 喜欢
        </div>
        <div v-show="islike" class="like">
          已喜欢
        </div>
      </div>
      <div class="action_item">
        <el-popover
          placement="top"
          width="160"
          v-model="visible">
          <div style="text-align: center;cursor:pointer; margin: 0">
            <el-button
              plain
              @click="open(articleform.id)">
              举报
            </el-button>
          </div>
          <el-button slot="reference">···</el-button>
        </el-popover>
      </div>
    </div>
    <div class="comment" v-show="showcomment">
      <div class="comment_nav">
        <h3>共{{ comment_num }}条评论</h3>
      </div>
      <div class="comment_body">
        <comment :id="articleform.id" :ischange="ischangechild" @getcommentnum="getcomnum"></comment>
      </div>
      <div class="comment_button">
        <input type="text" placeholder="写下你的评论...." v-model="commentinfo"><span><el-button class="comment_but"
                                                                                           @click="addcomment()">发表回复</el-button></span>
      </div>
    </div>
    <div class="mask" v-if="showboxcollect">
      <div class="collect">
        <div class="collect_nav">
          <h1>添加收藏</h1>
          <p>请选择你想要添加的收藏夹</p>
        </div>
        <div class="collect_body">
          <div v-for="(item,index) in this.collectlist" class="collect_body_item">
            <span>{{ item.name }}</span>
            <span><el-button @click="addcollect(item.collectid)">收藏</el-button></span>
          </div>
        </div>
        <div class="collect_but">
          <el-button @click="newcollect()">创建收藏夹</el-button>
        </div>
        <div class="close_but">
          <img src="./icon/close.svg" alt="" @click="closecollect">
        </div>
      </div>

    </div>

    <div class="mask" v-if="showaddcollect">
          <div class="addcollect">
               <h3>添加新收藏夹</h3>
            <input type="text" v-model="collectname">
            <p><span><el-button @click="turnback()">返回</el-button></span> <span><el-button @click="createcollect(collectname)">创建</el-button></span></p>
          </div>
    </div>


  </div>
</template>

<script>

import axios from "axios";
import comment from "@/components/comment/Comment";
import collection from "@/components/collection/collection";

export default {
  name: 'index',
  props: [
    'articleform', 'types'
  ],
  components: {
    comment, collection
  },
  data() {
    return {
      collectname:'新收藏夹',
      showaddcollect:false,
      visible: false,
      agree_num: 0,
      comment_num: 0,
      isshow: false,
      isagree: false,
      isdisagree: false,
      showcomment: false,
      commentinfo: '',
      ischangechild: true,
      islike: false,
      type: '',
      collectlist: [],
      collectid: '',
      showboxcollect: false,
      showinfo: false,
      userinfo: {},
      isfuns: false,

    }
  },
  methods: {
    getHeadItems() {
      axios
        .get('http://127.0.0.1:80/getHeadItems')
        .then(res => {
          this.head_item = []
          for (let item of res.data) {
            this.head_item.push(item.name)
          }
        })
    },
    showmore(title) {
      let height = document.documentElement.scrollTop
      console.log(height)
      this.isshow = !this.isshow
      this.isshow ? this.$refs.text.style.height = 'auto' :
        this.$refs.text.style.height = '40px'
      this.isshow ? this.articleform.nexttext = this.articleform.answer :
        this.articleform.nexttext = this.articleform.text.substring(0, 80)
      axios
        .post(`http://127.0.0.1:80/insertmodel?name=${this.$store.state.username}&title=${title}`)
        .then(res => {
          window.scrollTo(40,height)
        })
    },
    agree(id) {
      axios
        .get(`http://127.0.0.1:80/agree?id=${id}&userid=${this.$store.state.userid}&arthur=${this.articleform.arthur}&title=${this.articleform.title}`)
        .then(res => {
          if (res.data == '1') {
            this.agree_num++
            this.isagree = true
          } else if (res.data == '0') {
            this.agree_num--
            this.isagree = false
          } else if (res.data == '-1') {
            this.agree_num = this.agree_num + 2;
            this.isagree = true
            this.isdisagree = false
          }
        })
    },
    disagree(id) {
      axios
        .get(`http://127.0.0.1:80/disagree?id=${id}&userid=${this.$store.state.userid}`)
        .then(res => {
          if (res.data == '1') {
            this.isdisagree = true
            this.agree_num--
          } else if (res.data == '0') {
            this.agree_num = this.agree_num - 2;
            this.isdisagree = true
            this.isagree = false
          } else if (res.data == '-1') {
            this.isdisagree = false
            this.agree_num++
          }
        })
    },
    searchques() {
      axios
        .post('http://127.0.0.1:80/queryquestion?title=' + this.articleform.title)
        .then(res => {
          if (res.data == 1) {
            this.$router.push({
              path: '/question',
              query: {
                title: this.articleform.title
              }
            }).catch(err => {
              console.log(666)
            })
          } else {
            alert('问题不存在')
          }

        })
    },
    queryisagree(id, userid) {
      axios
        .get(`http://127.0.0.1:80/queryisagree?id=${id}&userid=${userid}`)
        .then(res => {
          if (res.data == '1') {
            this.isagree = true
          } else if (res.data == '-1') {
            this.isdisagree = true
          }
        })
    },
    showcommen() {
      this.showcomment = !this.showcomment
    },
    addcomment() {
      axios
        .post(`http://127.0.0.1:80/addcomment?id=${this.articleform.id}&comment=${this.commentinfo}&user=${this.$store.state.username}&icon=${this.$store.state.icon}&arthur=${this.articleform.arthur}&title=${this.articleform.title}`)
        .then(res => {
          this.ischangechild = !this.ischangechild
          this.commentinfo = ''
        })
    },
    getcomnum(data) {
      this.comment_num = data
    },
    showcollect(id) {
      this.collectid = id
      this.showboxcollect = true
      axios
        .get(`http://127.0.0.1:80/getcollection?username=${this.$store.state.username}`)
        .then(res => {
          this.collectlist = res.data
        })
    },
    addlike(id) {
      axios
        .get(`http://127.0.0.1:80/addlike?id=${id}&userid=${this.$store.state.userid}`)
        .then(res => {
          if (res.data == '1') {
            this.islike = true
          }
        })
    },
    querylike(id) {
      axios.get(`http://127.0.0.1:80/querylike?id=${id}&userid=${this.$store.state.userid}`)
        .then(res => {
          if (res.data == '1') {
            this.islike = true
          } else {
            this.islike = false
          }
        })
    },
    closecollect() {
      this.showboxcollect = false
    },
    addcollect(id) {
      axios.get(`http://127.0.0.1:80/addcollect?answerid=${this.collectid}&collectid=${id}`)
        .then(res => {
          if (res.data == '1') {
            alert('收藏成功')
            this.showboxcollect = false
          }
        })
    },
    share(title) {
      const sharelink = `http://localhost:8080/question?title=${title}`
      this.$copyText(sharelink).then((e) => {
        alert('已将文章链接复制到粘贴板')
      })
    },
    turntouserindex(username) {
      this.$router.push({
        path: '/Userindex',
        query: {
          username: username
        }
      })
    },
    showuserinfo(username) {
      axios
        .get(`http://127.0.0.1:80/getuserinfo?username=${username}&funsid=${this.$store.state.userid}`)
        .then(res => {
          this.userinfo = res.data[0]
          this.showinfo = true;
          if (this.userinfo.isfuns == true) {
            this.isfuns = true
          }
        })
    },
    displayuserinfo() {
      this.showinfo = false
    },
    befuns(userid, funsid) {
      axios
        .post(`http://127.0.0.1:80/befuns?funsid=${funsid}&userid=${userid}`)
        .then(res => {
          if (res.data == '1') {
            this.isfuns = true
            this.userinfo.funs++
          }
        })

    },
    nobefuns(userid, funsid) {
      axios
        .post(`http://127.0.0.1:80/nobefuns?funsid=${funsid}&userid=${userid}`)
        .then(res => {
          if (res.data == '1') {
            this.isfuns = false
            this.userinfo.funs--
          }
        })
    },
    open(id) {
      this.$prompt('请简单阐述你选择举报的原因', '举报', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        axios.post(`http://127.0.0.1:80/report?id=${id}&reason=${value}&name=${this.$store.state.username}`)
          .then(res=>{
            this.$message({
              type: 'success',
              message: `感谢您对维护平台做出的贡献，我们会尽快处理这次举报`
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '出现了未知错误，请您刷新或者重新登录'
        });
      });
    },
    newcollect(){
      this.showboxcollect = false;
      this.showaddcollect = true ;
    },
    turnback(){
      this.showboxcollect = false;
      this.showaddcollect = false ;
    },
    createcollect(name){
      axios.post(`http://127.0.0.1:80/createcollect?name=${name}&username=${this.$store.state.username}`)
        .then(res=>{
          alert('创建成功')
          this.turnback();
        })
    },
    turntomessage(name){
      this.$router.push({
        path:'/Message',
        query:{
          username:name
        }
      })
    }


  },
  mounted() {
    this.agree_num = this.articleform.agreenum;
    this.comment_num = this.articleform.commitnum;
    this.queryisagree(this.articleform.id, this.$store.state.userid)
    this.querylike(this.articleform.id)
    if (this.types === 'search') {
      this.isshow = true;
      this.articleform.nexttext = this.articleform.answer
    } else if (this.types === 'question') {
      this.isshow = true;
      this.articleform.nexttext = this.articleform.answer
    } else if (this.types === 'article') {

    }


  },


}
</script>

<style scoped lang="less">
@import 'Article.less';
</style>
