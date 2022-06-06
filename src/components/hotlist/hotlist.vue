<template>

<div class="hotitem">
<div class="left">
  {{index+1}}
</div>
  <div class="right">
    <h3 @click="searchques(hot.name)">{{this.hot.name}}</h3>
    <p>{{this.hot.intro}}</p>
    <p>热度:{{this.hot.hot}}</p>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: '',
  props: [
      'hot','index'
  ],
  data() {
    return {

    }
  },
  watch:{

  },
  methods: {
    searchques(name) {
      axios
        .post('http://127.0.0.1:80/queryquestion?title=' + name)
        .then(res => {
          if (res.data == 1) {
            this.$router.push({
              path: '/question',
              query: {
                title: name
              }
            }).catch(err => {
              console.log(666)
            })
          } else {
            alert('问题不存在')
          }

        })
    },
  },
  mounted() {

  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'hotlist.less';
</style>
