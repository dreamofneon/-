<template>
  <div>
    <Nav></Nav>
    <div class="search_index">
      <div class="article_box">
        <div class="article" v-for="item in this.searchlist">
          <Article :articleform = "item" :types="'search'"></Article>
        </div>
      </div>
      <div class="hotsearch">
        <h3>近期热搜</h3>
        <div v-for="item in this.hotlist" class="hot_item" @click="turntoquestion(item.name)">
            {{item.name}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import axios from "axios";
import Nav from "@/views/Nav/Nav";
import Article from "@/components/Article/Article";
import Answer from "@/components/answer/Answer";

export default {
  name: 'search',
  props: [],
  components: {
    Nav, Article,Answer
  },
  data() {
    return {
      searchtitle:'',
      searchlist: [],
      hotlist:[],
    }
  },
  watch: {},
  methods: {
    getsearchlist(title) {
      axios
        .post('http://127.0.0.1:80/searchquestion?title=' + title)
        .then(res => {
          console.log(res)
          if (res.data) {
            this.searchlist = res.data
          } else {
            alert('搜索不到')
          }
        })
    },
    gethotquestion(){
      axios
      .get('http://127.0.0.1:80/gethotquestion')
      .then(res=>{
        this.hotlist = res.data
      })
    },
    turntoquestion(title){
            this.$router.push({
              path: '/question',
              query: {
                title: title
              }
            })
    }
  },
  mounted() {
    this.searchtitle = this.$route.query.searchtitle;
    this.getsearchlist(this.searchtitle)
    this.gethotquestion()
  },


}
</script>

<style scoped lang="less">
@import 'search.less';
</style>
