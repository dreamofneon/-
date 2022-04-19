<template>

<div>
<div v-for="item in announce" class="announceitem">
    <span @click="gotoannounceitem(item.title)">· {{item.title}} </span> <h3> {{item.arthur}}</h3>
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
      announce:[],
    }
  },
  watch:{

  },
  methods: {
    getannounce(){
      axios.get(` http://127.0.0.1:80/getannounce`)
        .then(res=>{
          this.announce = res.data
        })
    },
    gotoannounceitem(name){
      this.$router.push({
        path:'/announceitem',
        query:{
          title : name
        }
      })
    }
  },
  mounted() {
    this.getannounce()
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'announceindex.less';
</style>
