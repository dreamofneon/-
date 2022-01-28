<template>

  <div class="answer_index">
    <div v-show="this.showtitle" class="showtitle">
     <h2 @click="turntoquestion(list.title)">{{this.list.title}}</h2>
    </div>
    <div class="answer_nav">
          <div class="answer_icon">
            <img src="./icon/neon.jpg" alt="">
          </div>
          <div class="answer_info">
            <h3>{{this.list.arthur}}</h3>
            <p>{{this.list.arthurinfo}}</p>
          </div>
    </div>
    <div class="answer_body">
        <div v-html="this.list.answer" class="answer_item">

        </div>
         <p><span>发布时间 : </span>{{this.list.time}}</p>
    </div>
    <div class="answeraction">
      <button @click="agree(list.id)">
        <p v-show="!isagree"><img src="./icon/上箭头.svg" alt="">&nbsp赞同{{ agree_num }}</p>
        <p v-show="isagree"><img src="./icon/上箭头.svg" alt="">已赞同</p>
      </button>
      <button @click="disagree(list.id)">
        <p v-show="!isdisagree"><img src="./icon/下箭头.svg" alt=""></p>
        <p v-show="isdisagree"><img src="./icon/下箭头.svg" alt="">已反对</p>
      </button>
      <div class="action_item" @click="showcommen()">
        <div v-show="!showcomment&&comment_num>0">
          <img src="./icon/评论.svg" alt="">  {{ comment_num }}评论
        </div>
        <div v-show="!showcomment&&comment_num==0">
          添加评论
        </div>
        <div v-show="showcomment">
          收起评论
        </div>
      </div>
      <div class="action_item">
        <img src="./icon/共享.svg" alt=""> 分享
      </div>
      <div class="action_item" @click="showcollect(this.list.id)">
        <img src="./icon/收藏.svg" alt="">收藏
      </div>
      <div class="action_item" @click="addlike(list.id)">
        <div v-show="!islike">
          <img src="./icon/喜欢.svg" alt=""> 喜欢
        </div>
        <div v-show="islike" class="like">
          已喜欢
        </div>
      </div>
      <div class="action_item">
        ···
      </div>
    </div>
    <div class="comment" v-show="showcomment">
      <div class="comment_nav">
        <h3>共{{comment_num}}条评论</h3>
      </div>
      <div class="comment_body">
        <comment :id="this.list.id" :ischange="ischangechild" @getcommentnum="getcomnum"></comment>
      </div>
      <div class="comment_button">
        <input type="text" placeholder="写下你的评论...." v-model="commentinfo"><span><el-button class="comment_but" @click="addcomment()">发表回复</el-button></span>
      </div>
    </div>


  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'index',
  props: [
     'list','showtitle'
  ],
  data() {
    return {
      agree_num: 0,
      comment_num: 0,
      isshow: false,
      answerid:'',
      isagree:false,
      isdisagree:false,
      showcomment:false,
      islike:false,
      commentinfo:'',
      ischangechild:true,
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
    agree(id) {
      axios
        .get(`http://127.0.0.1:80/agree?id=${id}&userid=${this.$store.state.userid}&arthur=${this.list.arthur}&title=${this.list.title}`)
        .then(res => {
          if(res.data=='1'){
            this.agree_num++
            this.isagree = true
          }else if(res.data=='0'){
            this.agree_num--
            this.isagree = false
          }else if(res.data=='-1'){
            this.agree_num=this.agree_num+2;
            this.isagree = true
            this.isdisagree = false
          }
        })
    },
    disagree(id) {
      axios
        .get(`http://127.0.0.1:80/disagree?id=${id}&userid=${this.$store.state.userid}`)
        .then(res => {
          if(res.data=='1'){
            this.isdisagree=true
            this.agree_num--
          }else if(res.data=='0'){
            this.agree_num=this.agree_num-2;
            this.isdisagree = true
            this.isagree = false
          }else if(res.data=='-1'){
            this.isdisagree = false
            this.agree_num++
          }
        })
    },
    queryisagree(id,userid){
      axios
        .get(`http://127.0.0.1:80/queryisagree?id=${id}&userid=${userid}`)
        .then(res => {
          if(res.data=='1'){
            this.isagree = true
          }else if(res.data=='-1'){
            this.isdisagree = true
          }
        })
    },
    turntoquestion(title){
      this.$router.push({
        path: '/question',
        query: {
          title: title
        }
      })
    },
    showcollect(id){
      this.$emit('showcollect',id)
    },
    addlike(id){
      axios
        .get(`http://127.0.0.1:80/addlike?id=${id}&userid=${this.$store.state.userid}`)
        .then(res=>{
          if(res.data=='1'){
            this.islike = true
          }
        })
    },
    showcommen(){
      this.showcomment=!this.showcomment
    },
    getcomnum(data){
      this.comment_num = data
    },
    addcomment(){
      axios
        .post(`http://127.0.0.1:80/addcomment?id=${this.list.id}&comment=${this.commentinfo}&user=${this.$store.state.username}&icon=${this.$store.state.icon}&arthur=${this.list.arthur}&title=${this.list.title}`)
        .then(res=>{
          this.ischangechild = !this.ischangechild
          this.commentinfo = ''
        })
    },
    querylike(id){
      axios.get(`http://127.0.0.1:80/querylike?id=${id}&userid=${this.$store.state.userid}`)
        .then(res=>{
          if(res.data=='1'){
            this.islike = true
          }else{
            this.islike =false
          }
        })
    }
  },
  mounted() {
    this.agree_num = this.list.agreenum;
    this.answerid = this.list.id
    this.comment_num = this.list.commitnum;
    this.queryisagree(this.answerid,this.$store.state.userid)
    this.querylike(this.list.id)
  },


}
</script>

<style scoped lang="less">
@import 'Answer.less';
</style>
