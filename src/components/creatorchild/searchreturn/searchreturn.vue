<template>

<div>
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
  <div class="tablelist">
    <el-table
    :data="tablelist"
    width="100%"
    >
      <el-table-column
      prop="name"
      label="问题"
      width="280"
      >
        <template slot-scope="scope">
          <div>
            <p style="margin-bottom: 10px;cursor:pointer;" @click="searchques(scope.row.name)">
              <span style="border-radius: 2px;font-size: 8px;margin: 5px;background-color: #831C20;color: #E5EFFF;padding: 5px">飙升</span>{{scope.row.name}}
            </p>
            <p>
              <span v-if="scope.row.topic1!='undefined'" style="border-radius: 2px;font-size: 8px;margin: 5px;background-color: gainsboro;padding: 5px">{{scope.row.topic1}}</span>
              <span v-if="scope.row.topic2!='undefined'" style="border-radius: 2px;font-size: 8px;margin: 5px;background-color: gainsboro;padding: 5px">{{scope.row.topic2}}</span>
              <span v-if="scope.row.topic3!='undefined'" style="border-radius: 2px;font-size: 8px;margin: 5px;background-color: gainsboro;padding: 5px">{{scope.row.topic3}}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="hot"
        label="热度"
      >
      </el-table-column>
      <el-table-column
        prop="notice"
        label="关注者"
      >
      </el-table-column>
      <el-table-column
        prop="answer"
        label="回答"
      >
      </el-table-column>
      <el-table-column
        prop="agree"
        label="赞同"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <button style="cursor:pointer;;width: 80px;background-color:#0066FF; color: white;border-radius: 5px;padding: 8px;border: none" @click="searchques(scope.row.name)">去回答</button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: 'new',
  props: [

  ],
  data() {
    return {
      keyword:'',
      topiclist:[],
      tablelist:[
        {
             name:'4 月 10 日上海新增本土确诊病例 914 例、无症状感染者 25173 例，目前情况如何？',
             hot:10.0,
             notice:466,
             answer:605,
             agree:5230,
        }
      ],
      tableback:[],
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
  watch:{

  },
  methods: {

      gethottable(keyword){
        axios
          .get(`http://127.0.0.1:80/getsearchtable?keyword=${keyword}`)
          .then(res=>{
            console.log(res.data)
            this.tablelist = res.data
            this.tableback = res.data
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
          keyword : data,
          time:new Date().getTime()
        }
      })
    }

  },
  mounted() {
    this.keyword = this.$route.query.keyword
    this.gethottable(this.keyword)
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },



}
</script>

<style scoped lang="less">
@import 'searchreturn.less';
</style>
