<template>
  <div class="commentmanage">
    <div class="left">
      <div class="comment">
        <p>最新评论</p>
      </div>
      <div v-for="item in answerlist" class="item" @click="getcommentlist(item.id)">
        <h3>{{item.title}}</h3>
        <p><span>{{ item.commitnum }}评论</span> <span>{{ item.time }}</span></p>
      </div>
    </div>
    <div class="right">
      <div v-for="item in commentlist" class="right_item">
        <p><span><img :src="item.icon" alt=""> {{item.user}} 评论了你</span> <span>{{item.date}}</span></p>
        <div class="commentindex">{{item.comment}}</div>

      </div>
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
      commentlist: []
    }
  },
  watch: {},
  methods: {
    getanswerlist(name){
      axios.get(` http://127.0.0.1:80/getanswerlist?username=${name}`)
      .then(res=>{
        this.answerlist = res.data
      })
    },
    getcommentlist(name){
      axios.get(`http://127.0.0.1:80/getcommentlist?id=${name}`)
      .then(res=>{
        this.commentlist  =  res.data
      })
    }
  },
  mounted() {
    this.getanswerlist(this.$store.state.username)

  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'commentmanage.less';
</style>
