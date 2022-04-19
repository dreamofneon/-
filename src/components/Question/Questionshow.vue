<template>
  <div class="index">
    <div class="topic">
      <div>
        <input type="text" :value="item" v-for="item in this.questionlist.topic" class="topic_item">
      </div>
      <div class="question_body">
        <div>
          <h1>{{ questionlist.name }}</h1>
          <h2><span><img :src="questionlist.icon" alt=""></span> {{ questionlist.arthur }}</h2>
        </div>
        <h3>{{ questionlist.intro }}</h3>
        <p>
          <span>
           <el-button @click="tonotice(questionlist.name)" v-if="this.isnotice=='true'">已关注</el-button>
           <el-button @click="tonotice(questionlist.name)" v-if="this.isnotice=='false'">关注</el-button>
          </span>
          <span>
           <el-button @click="showedi">写回答</el-button>
          </span>
          <span>
            <el-button @click="agree(questionlist.name)" v-if="this.isagree=='true'">已赞同</el-button>
           <el-button @click="agree(questionlist.name)" v-if="this.isagree=='false'">点赞</el-button>
          </span>
          <span>
            ...
          </span>
        </p>
      </div>

    </div>
    <div v-show="showeditor">
      <div class="ques_editor" id="editor">

      </div>
      <div class="editor_body">
        <h2>
          发布设置
        </h2>
        <h3>
          作者介绍 <span><input type="text" v-model="$store.state.intro"></span>
        </h3>
        <h3>
          评论权限
        </h3>
      </div>
      <div class="editor_footer">
        <button @click="addanswer">发布回答</button>
      </div>
    </div>

  </div>

</template>

<script>

import axios from "axios";
import E from 'wangeditor'
import {insertmodel} from "@/api/model/model";

export default {
  name: 'index',
  props: [
    'title',
  ],
  data() {
    return {
      arthurinfo: '',
      intro: '',
      questionlist: {
        name: "",
        topic: [],
        intro: '',
        hot: '',
      },
      editor: null,
      showeditor: false,
      aboutlist: [],
      isnotice: 'false',
      isagree: 'false',

    }
  },
  methods: {
    queryquestioninfobytitle() {
      axios
        .get('http://127.0.0.1:80/queryquebyname?title=' + this.title)
        .then(res => {
          this.$nextTick(() => {
            this.questionlist = res.data[0]
          })
        }).then(res => {
        this.getabouttopic()
      }).then(res => {
        this.getnoticestate()
      })
    },
    getabouttopic() {
      axios.post(`http://127.0.0.1:80/getabouttopic?topic=` + this.questionlist.topic)
        .then(res => {
          for (let item of res.data) {
            this.aboutlist.push(item)
          }
          this.$emit('getaboutlist', this.aboutlist)
        })
    },
    showedi() {
      this.showeditor = !this.showeditor
    },
    addanswer() {
      insertmodel(this.$store.state.username,this.questionlist.name)
      axios
        .post(`http://127.0.0.1:80/addanswer?title=${this.questionlist.name}&answer=${this.editor.txt.html()}&arthur=${this.$store.state.username}&arthurinfo=${this.arthurinfo}&text=${this.editor.txt.text()}&icon=${this.$store.state.icon}`,)
        .then(res => {
          this.$nextTick(() => {
            if (res.data == 1) {
              alert('发布成功')
              this.$router.go(0)
            }
          })
        })
    },
    notice(qname) {
      insertmodel(this.$store.state.username,qname)
      if (this.isnotice == 'true') {
        this.isnotice = 'false'
      } else {
        this.isnotice = 'true'
      }
      axios
        .post(`http://127.0.0.1:80/notice?qname=${qname}&username=${this.$store.state.username}`)
        .then(res => {

        })
    },
    tonotice(qname){
      this.throttled(this.notice(qname),2000)
    },
    throttled(fn, delay) {
      let timer = null
      let starttime = Date.now()
      return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
          fn.apply(context, args)
          starttime = Date.now()
        } else {
          timer = setTimeout(fn, remaining);
        }
      }
    },
    agree(qname) {
      if (this.isagree == 'true') {
        this.isagree = 'false'
      } else {
        this.isagree = 'true'
      }
      axios
        .post(`http://127.0.0.1:80/agreenotice?qname=${qname}&username=${this.$store.state.username}`)
        .then(res => {

        })
    },
    getnoticestate() {
      const name = this.questionlist.name
      const username = this.$store.state.username;
      axios
        .get(`http://127.0.0.1:80/getnoticestate?name=${name}&username=${username}`)
        .then(res => {
          console.log(res)
          this.isnotice = res.data[0].isnotice
          this.isagree = res.data[0].isagree
          console.log(this.isnotice)
        })
    }

  },
  mounted() {
    this.editor = new E(`#editor`)
    this.editor.config.zIndex = 10
    this.editor.create()
    this.queryquestioninfobytitle()
    this.arthurinfo = this.$store.state.intro

  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy()
    this.editor = null
  }


}
</script>

<style scoped lang="less">
@import 'Questionshow.less';
</style>
