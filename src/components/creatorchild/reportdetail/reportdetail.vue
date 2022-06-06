<template>
  <div>
    <div v-html="answer.answer" class="reportdetail">

    </div>
    <div class="report">
      <h3>
        举报者:{{ this.$route.query.name }}
      </h3>
      <p>举报原因:{{ this.$route.query.reason }}</p>
    </div>
    <p class="dealwith">
      <span>处理操作</span>
      <span><el-button @click="deleteanswer(answer.id,answer.arthur,name,reason)">删除回答</el-button></span>
      <span><el-button @click="deleteuser(answer.id,answer.arthur,name,reason)">删除用户</el-button></span>
      <span><el-button
        @click="finish(answer.id,this.$route.query.name,this.$route.query.reason)">处理完毕</el-button></span>
    </p>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: '',
  props: [],
  data() {
    return {
      answer: {},
      name: '',
      reason: '',
    }
  },
  watch: {},
  methods: {
    getanswer(id) {
      axios.get(`http://127.0.0.1:80/getansweritem?id=${id}`)
        .then(res => {
          this.answer = res.data[0]
          console.log(this.answer)
        })
    },
    deleteanswer(id, arthur, name, reason) {
      axios.post(` http://127.0.0.1:80/deleteanswer?id=${id}&arthur=${arthur}&name=${name}&reason=${reason}`)
        .then(res => {
          alert('删除成功')
          this.$router.go(0)
        })
    },
    deleteuser(id, arthur, name, reason) {
      axios.post(` http://127.0.0.1:80/deleteuser?id=${id}&arthur=${arthur}&name=${name}&reason=${reason}`)
        .then(res => {
          alert('删除成功')
          this.$router.go(0)
        })
    },
    finish(id, arthur, name, reason) {
      axios.post(` http://127.0.0.1:80/finish?id=${id}&arthur=${arthur}&name=${name}&reason=${reason}`)
        .then(res => {
          alert('处理完毕')
          this.$router.go(0)
        })
    },
  },
  mounted() {
    this.getanswer(this.$route.query.id)
    this.name = this.$route.query.name;
    this.reason = this.$route.query.reason
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'reportdetail.less';
</style>
