<template>
  <div>
    <div class="head">
      <h3>数据总览</h3>
      <div class="head_body">
        <div class="left">
          流量
          <img src="./icon/流量.svg" alt="">
        </div>
        <div class="right">
          <div class="rightitem">
            <h3>阅读总量</h3>
            181
          </div>
          <div class="rightitem">
            <h3>阅读总量</h3>
            181
          </div>
        </div>
      </div>
    </div>
    <div class="detail">
      <h3>数据趋势</h3>
         <div id="main" style="width: auto;height: 400px">

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
    return {}
  },
  watch: {},
  methods: {
    echartsInit(){


    }
  },
  mounted() {
    this.echartsInit()
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'contentanalyse.less';
</style>
