<template>

  <div class="index" >
    <div v-show="showskeletton" class="article_boxx">
      <el-skeleton :rows="40" animated :throttle="500"/>
    </div>
    <div class="article_box" v-show="!showskeletton" >
      <div class="article_nav">
        <span v-for="item in navlist" @click="changenav(item.id)">
          {{ item.name }}
        </span>
      </div>
      <div class="article" v-for="item in article_array" v-if="nav == 1">
        <Article :articleform="item" :types="'article'"></Article>
      </div>
      <div class="hotquestion" v-for="(item,index) in hotlist" v-xif="nav == 2">
        <hotlist :hot="item" :index="index"></hotlist>
      </div>
      <div class="article" v-for="item in noticelist" v-if="nav == 0">
        <Article :articleform="item" :types="'question'"></Article>
      </div>
    </div>
  </div>

</template>


<script>

import axios from "axios";
import Article from "@/components/Article/Article";
import hotlist from "@/components/hotlist/hotlist";

export default {
  name: 'index',
  components: {
    Article,hotlist
  },
  data() {
    return {
      noticelist:[],
      hotlist:[],
      nav:1,
      article_array: [],
      navlist: [
        {
          name: '关注',
          id: 0,
        },

        {
          name: '推荐',
          id: 1,
        },

        {
          name: '热榜',
          id: 2,
        },

      ],
      showskeletton: true,
    }
  },
  methods: {
    getArtList(name) {
      axios
        .get(`http://127.0.0.1:80/getbelikelist?username=${name}`)
        .then(res => {
          for (let item of res.data) {
            item.nexttext = item.text.substring(0, 80)
            if (item.answer.includes('img')) {
              item.nexttext = '[图片]' + item.nexttext
            }
            this.article_array.push(item)
          }
          this.showskeletton = false
        })
    },
    getHotList(){
       axios
        .get('http://127.0.0.1:80/gethotquestion')
         .then(res => {
        this.hotlist = res.data
      })
    },
    changenav(id){
      this.nav = id;
      if(id==2){
        this.getHotList()
      }
    },
    getnoticeanswerlist(id){
      axios.get(`http://127.0.0.1:80/getnoticeanswerlist?userid=${id}`)
        .then(res=>{
           this.noticelist = res.data
        })
    }



  },
  mounted() {
    this.getArtList(this.$store.state.username)
    this.getnoticeanswerlist(this.$store.state.userid)
  },
  updated() {

  },
  created() {
    window.onscroll = () => {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件(距底部20px时触发加载)
      if (
        scrollTop + windowHeight >= scrollHeight - 20
      ) {
        // console.log(
        //   "距顶部" +
        //     scrollTop +
        //     "可视区高度" +
        //     windowHeight +
        //     "滚动条总高度" +
        //     scrollHeight
        // );
        this.isAchiveBottom = true;
        //延时触发数据加载
        setTimeout(() => {
          //后端需要进行分页，然后前端从后端拿来实现滚动加载
          //这里利用数组push来模拟从后端拿到的数据
          this.getArtList(this.$store.state.username)
        }, 500);
      }
    };
  }


}
</script>

<style scoped lang="less">
@import 'Index.less';
</style>
