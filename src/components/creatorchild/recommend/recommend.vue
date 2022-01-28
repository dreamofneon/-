<template>

<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="问题"
      width="380">
    </el-table-column>
    <el-table-column
      prop="reason"
      label="推荐理由"
      width="480">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <button style="cursor:pointer;;width: 80px;background-color:#0066FF; color: white;border-radius: 5px;padding: 8px;border: none" @click="searchques(scope.row.name)">去回答</button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: '',
  props: [

  ],
  data() {
    return {
      tableData: [
        {
          name:'有天生好身材的人吗?',
          reason:'您可能会对身材话题感兴趣'
        }
      ]
    }
  },
  watch:{

  },
  methods: {
     getrecommendlist(name){
       axios
       .get(`http://127.0.0.1:80/getrecommendlist?username=${name}`)
       .then(res=>{
         this.tableData = res.data
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
        this.getrecommendlist(this.$store.state.username)
  },



}
</script>

<style scoped lang="less">
@import 'recommend.less';
</style>
