<template>

<div>
  <div v-for="item in report" class="report">
    <h3 @click="gotoreportdetail(item.id,item.name,item.reason)">回答id:{{item.id}}</h3>
    <p>举报者:{{item.name}} <span>举报原因:{{item.reason}}</span></p>
  </div>
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
      report:[],
    }
  },
  watch:{

  },
  methods: {
    getreport(){
      axios.get(`http://127.0.0.1:80/getreport`)
        .then(res=>{
          console.log(res)
          this.report = res.data
        })
    },
    gotoreportdetail(id,name,reason){
      this.$router.push({
        path:'/reportdetail',
        query:{
          id,
          name,
          reason,
        }
      })
    }
  },
  mounted() {
    this.getreport()
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'managereport.less';
</style>
