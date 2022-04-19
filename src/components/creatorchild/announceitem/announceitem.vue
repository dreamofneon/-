<template>

<div class="announceitem">
     <h3>
       {{this.announce.title}}
     </h3>
     <p v-html="announce.announce"></p>
  <h4>{{this.announce.arthur}}</h4>
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
       announce:{}
    }
  },
  watch:{

  },
  methods: {
    getannouncedetail(name){
      axios.get(`http://127.0.0.1:80/getannounceitem?title=${name}`)
        .then(res=>{
          console.log(res)
          this.announce = res.data[0]
        })
    }
  },
  mounted() {
      this.getannouncedetail(this.$route.query.title)
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'announceitem.less';
</style>
