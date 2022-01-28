<template>
  <div>
   <div class="comment_box"  v-for="(item,index) in this.commentlist">
    <div class="box_left">
      <img :src="item.icon" alt="">
    </div>
   <div class="box_right">
       <div class="box_name">
            <span>{{item.user}}</span>
            <span>2020-01-23</span>
       </div>
     <div class="box_body">
       {{item.comment}}
     </div>
     <div class="box_but">
       <img src="./img/zan.svg" alt="" @click="zan(index)">{{item.agreenum}}
     </div>
   </div>
 </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'comment',
  props: [
     'id','ischange',
  ],
  data() {
    return {
      commentlist:[]
    }
  },
  watch:{
      ischange(item1,item2){
        alert('发布评论成功')
        this.getcomment()
    }
  },
  methods: {
    getcomment(){
      axios
        .get(`http://127.0.0.1:80/getcomment?id=${this.id}`)
        .then(res=>{
          this.commentlist = res.data
          this.$emit('getcommentnum',this.commentlist.length)
        })
    },
    zan(index){
      axios
      .get(`http://127.0.0.1:80/dianzan?id=${this.commentlist[index].commentid}&userid=${this.$store.state.username}`)
      .then(res=>{
          if(res.data=='1'){
            this.commentlist[index].agreenum++
          }else{
            this.commentlist[index].agreenum--
          }
      })
    }
  },
  mounted() {
    this.getcomment()
  },



}
</script>

<style scoped lang="less">
@import 'Comment.less';
</style>
