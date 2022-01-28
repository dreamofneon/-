<template>

  <div class="collectionitemindex">
    <div class="collectionitem_item" v-for="item in collectionlist">
      <h3 @click="turntocollection(item.collectid,item.name)">{{item.name}}</h3>
      <p>{{item.date}}</p>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'collectionitem',
  props: [
      'username'
  ],
  data() {
    return {
collectionlist:[],
    }
  },
  watch:{

  },
  methods: {
    getcollectionlist(username){
      axios
        .get(`http://127.0.0.1:80/getcollectionlist?username=${username}`)
        .then(res=>{
         this.collectionlist = res.data
        })
    },
    turntocollection(id,name){
      this.$router.push({
        path:'/Collection',
        query:{
          collectid : id,
          name :name
        }
      })
    }
  },
  mounted() {
    this.getcollectionlist(this.$store.state.username)
  },


}
</script>

<style scoped lang="less">
@import 'collectionitem.less';
</style>
