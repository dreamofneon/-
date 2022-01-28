<template>

  <div class="index">
    <div v-show="showskeletton" class="article_boxx">
      <el-skeleton :rows="40" animated   :throttle="500"/>
    </div>
    <div class="article_box" v-show="!showskeletton">
      <div class="article_nav">
        <span v-for="item in navlist">
          {{ item.name }}
        </span>
      </div>
      <div class="article" v-for="item in article_array">
        <Article :articleform="item" :types="'article'"></Article>
      </div>
    </div>
  </div>

</template>


<script>

import axios from "axios";
import Article from "@/components/Article/Article";


export default {
  name: 'index',
  components: {
    Article
  },
  data() {
    return {
      article_array: [],
      navlist: [
        {
          name: '关注',
          id: 0,
        },

        {
          name: '推荐',
          id: 0,
        },

        {
          name: '热榜',
          id: 0,
        },

        {
          name: '视频',
          id: 0,
        },
      ],
      showskeletton:true,
    }
  },
  methods: {
    getArtList() {
      axios
        .get('http://127.0.0.1:80/getartlist')
        .then(res => {
          for (let item of res.data) {
            item.nexttext = item.text.substring(0, 80)
            if(item.answer.includes('img')){
              item.nexttext = '[图片]'+item.nexttext
            }
          }
          this.article_array = res.data
          this.showskeletton = false

        })
    },



  },
  mounted() {
    this.getArtList()
  },
  updated() {

  }


}
</script>

<style scoped lang="less">
@import 'Index.less';
</style>
