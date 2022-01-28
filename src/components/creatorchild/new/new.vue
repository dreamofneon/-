<template>

<div>
  <div class="topiclist">
     <button v-for="item in this.topiclist" class="topic" @click="choose(item)">
         {{item}}
     </button>

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
      tableback:[]
    }
  },
  watch:{

  },
  methods: {

      gethottopic(){
         axios
        .get(`http://127.0.0.1:80/gethottopic`)
        .then(res=>{
            this.topiclist = res.data
        })
      },
      gethottable(){
        axios
          .get(`http://127.0.0.1:80/getnewtable`)
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
    choose(topic){
        if(topic!='全部'){
          let returnlist = []
          for(let item of this.tableback){
            if(item.topic1==topic){
              returnlist.push(item)
            }
            if(item.topic2==topic){
              returnlist.push(item)
            }
            if(item.topic3==topic){
              returnlist.push(item)
            }
          }
          this.tablelist = returnlist
        }
        else{
          this.tablelist = this.tableback
        }

    }
  },
  mounted() {
    this.gethottopic()
    this.gethottable()
  },



}
</script>

<style scoped lang="less">
@import 'new.less';
</style>
