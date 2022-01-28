<template>
  <div class="question">
    <Nav></Nav>
    <Question :title="this.$route.query.title" @getaboutlist="getaboutlist">
    </Question>

    <div class="index1">
      <div class="question_body">
      <div class="questionbox">
        <div class="ques_nav">
          <h3>{{answerlist.length}}个答案</h3>
        </div>
        <div class="ques_left">
          <div class="answer_box" v-for="item in this.answerlist">
            <Article :articleform = "item" :types="'question'"></Article>
          </div>
        </div>
      </div>
        <div class="about">
             <h3>
               相关问题
             </h3>
          <div v-for="item in this.aboutlist">
            <p @click="searchques(item)">
              {{item}}<span>6 个问题</span>
            </p>
          </div>

        </div>
        <div class="fuck">

        </div>
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import Nav from "@/views/Nav/Nav";
import Question from "@/components/Question/Questionshow";
import Answer from "@/components/answer/Answer";
import Article from "@/components/Article/Article";
import {insertmodel} from "@/api/model/model"


export default {
  name: 'Userindex',
  components: {
    Nav, Question,Article
  },
  data() {
    return {
      article_array: [],
      title: '',
      navlist: [
        '动态', '回答', '视频', '提问', '文章', '收藏', '关注'
      ],
      answerlist:[],
      aboutlist:[],
    }
  },
  methods: {
    getArtList() {
      axios
        .get('http://127.0.0.1:80/getartlist')
        .then(res => {
          for (let item of res.data) {
            item.nexttext = item.text.substring(0, 80)
          }
          this.article_array = res.data
        })
    },
    getanswerlistbytitle(){
      axios
      .get(`http://127.0.0.1:80/getanswerlistbytitle?title=${this.$route.query.title}`)
      .then(res=>{
        console.log(res)
        this.answerlist = res.data
      })
    },
    getaboutlist(data){
      this.aboutlist = data
    },
    searchques(title){
      axios
        .post(`http://127.0.0.1:80/queryquestion?title=${title}`)
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
          this.$router.go(0)

        })
    },


  },
  mounted() {
    this.getanswerlistbytitle()
    insertmodel(this.$store.state.username,this.$route.query.title)
  },


}
</script>

<style scoped lang="less">
@import "Question.less";
</style>
