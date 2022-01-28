<template>

  <div class="searchpage">
    <div class="searchnav">
      <h1>问题搜索</h1>
      <div class="uselessbox">
        <el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="gotosearchreturn(keyword)">搜索</el-button>
      </div>


    </div>
    <div class="searchbody">
      <div class="item">
        <h3>大热搜索</h3>
        <div v-for="(item,index) in search">
          <p @click="searchbykeyword(item.name)"><span>{{index+1}}</span>{{item.name}}</p>
        </div>
      </div>
      <div class="item">
        <h3>热门题问</h3>
        <div v-for="(item,index) in hot">
        <p @click="searchques(item.name)"><span>{{index+1}}</span>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: '',
  props: [],
  data() {
    return {
      keyword:'',
      hot: [],
      search:[],
      searchinfo:'',
      options: [],
      value: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]
    }
  },
  watch: {},
  methods: {
    gethotquestion() {
      axios
        .get(`http://127.0.0.1:80/gethotquestion`)
        .then(res => {
          this.hot = res.data.splice(0, 10)
        })
    },
    searchbykeyword(name){
      this.$router.push({
        path: '/Search',
        query: {
          searchtitle : name
        }
      })
    },
    getsearch() {
      axios
        .get(`http://127.0.0.1:80/getsearch`)
        .then(res => {
          this.search = res.data.splice(0, 10)
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
    remoteMethod(query) {
      this.keyword = query
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    gotosearchreturn(data){
      this.$router.push({
        path:'/searchreturn',
        query:{
          keyword : data
        }
      })
    }
  },
  mounted() {
    this.gethotquestion();
    this.getsearch();
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },


}
</script>

<style scoped lang="less">
@import 'search.less';
</style>
