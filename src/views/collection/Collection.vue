<template>
  <div class="all">
    <Navs></Navs>
<!--    <div v-for="item in collectionitemlist">-->
<!--      <Article :articleform="item"></Article>-->
<!--    </div>-->
   <div class="collection_index">
      <div class="collection_index_left">
        <div class="left_nav">
           <h3>{{name}}</h3>
        </div>
        <div class="left_body">
          <div class="left_body_nav">
            {{collectionitemlist.length}}个内容
          </div>
          <div class="left_body_all">
            <div class="left_body_item" v-for="item in collectionitemlist">
              <Article :articleform="item"></Article>
            </div>
          </div>

        </div>
      </div>
     <div class="collection_index_right">
        <div class="right_nav">
          <h3>我的收藏夹</h3>
        </div>
       <div class="right_body">
          <div v-for="item in collectionlist" class="right_body_item">
            <h4 @click="turntocollection(item.id,item.name)">{{item.name}}</h4>
          </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>

import axios from "axios";
import Article from "@/components/Article/Article";
import Navs from '@/views/Nav/Nav'

export default {
  name: 'Collection',
  props: [],
  components:{
    Article,Navs
  },
  data() {
    return {
      collectid: '',
      collectionitemlist: [],
      collectionlist:[],
      name:'',
    }
  },
  watch: {},
  methods: {
    getcollectionitem(collectid) {
      axios
        .get(`http://127.0.0.1:80/getcollectionitem?collectid=${collectid}`)
        .then(res => {
          this.collectionitemlist = res.data
        })
    },
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
          name:name
        }
      })
    }
  },
  mounted() {
    this.collectid = this.$route.query.collectid;
    this.name = this.$route.query.name
    this.getcollectionitem(this.collectid);
    this.getcollectionlist(this.$store.state.username)

  },


}
</script>

<style scoped lang="less">
@import 'Collection.less';
</style>
