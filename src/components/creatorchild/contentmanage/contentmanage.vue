<template>

  <div>
    <div v-for="item in answerlist" class="answeritem">
      <h3> <span>{{item.title}}</span> <span>{{item.time}}</span></h3>
      <div class="answertext">
        {{item.text}}
      </div>
      <p>
        <span>
            <span>{{item.hot}}热度</span>
        <span>{{item.agreenum}}赞同</span>
        <span>{{item.commitnum}}评论</span>
        <span>{{item.collectnum}}收藏</span>
        <span>{{item.likenum}}喜欢</span>
        </span>
        <span>
          <el-button @click="edit()">编辑</el-button>
          <el-button>查看评论</el-button>
          <el-button>分享</el-button>
          <el-button>删除</el-button>
        </span>

      </p>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'commentmanage',
  props: [],
  data() {
    return {
      answerlist: [],
    }
  },
  watch: {},
  methods: {
    getanswer(name){
      axios
      .get(`http://127.0.0.1:80/getanswer?username=${name}`)
      .then(res=>{
        this.answerlist = res.data
      })
    },
  },
  mounted() {
     this.getanswer(this.$store.state.username)
  },
  // http://127.0.0.1:80/
}
</script>

<style scoped lang="less">
@import 'contentmanage.less';
</style>
