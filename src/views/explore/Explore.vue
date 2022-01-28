<template>
<div>
<navs></navs>
  <div class="explore_index">
    <div class="explore_1">
         <h2>
           <img src="./icon/问题.svg" alt="">
           <span>问题广场</span>
         </h2>
      <div class="explore_body">
        <div class="explore_list">
           <h3>近期热点</h3>
          <div v-for="(item,index) in hotquestionlist" class="hotitem">
            <p @click="searchques(item.name)"> <span>{{++index}}</span>{{item.name}}</p>
            <h5>{{shorttext(item.intro)}}</h5>
          </div>
          <button>查看全部热点问题 ></button>
        </div>
        <div class="explore_list">
          <h3>潜力问题</h3>
          <div v-for="(item,index) in newquestionlist" class="hotitem">
            <p @click="searchques(item.name)"> <span>{{++index}}</span>{{item.name}}</p>
            <h5>{{shorttext(item.intro)}}</h5>
          </div>
          <button>查看全部潜力问题 ></button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import axios from "axios";
import navs from "@/views/Nav/Nav";
export default {
  name: 'explore',
  components:{
    navs
  },
  props: [

  ],
  data() {
    return {
      newquestionlist:[],
      hotquestionlist:[],
    }
  },
  watch:{

  },
  computed:{
    shorttext:(text)=>{
      return (text)=>{
        text = Array.from(text)
        text = text.splice(0,35).join('')+'...'
        return text
      }

    }
  },
  methods: {
     getnew(){
       axios
       .get(`http://127.0.0.1:80/getnew`)
       .then(res=>{
         this.newquestionlist = res.data
       })
     },
    gethot(){
      axios
        .get(`http://127.0.0.1:80/gethot`)
        .then(res=>{
          console.log(res.data)
          this.hotquestionlist = res.data
        })
    },
    searchques(title){
      axios
        .post('http://127.0.0.1:80/queryquestion?title='+title)
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

        })
    },
  },
  mounted() {
    this.gethot();
    this.getnew()
  },



}
</script>

<style scoped lang="less">
@import 'Explore.less';
</style>
