<template>

<div class="edit_index">
  <Navs></Navs>
<div class="edit_body">
 <div class="edit_nav_cover">
   <img src="./icon/img.png" alt="">
   <div class="edit_menu">
     <div class="edit_menu_left">
       <div class="icon">
         <el-upload
           class="avatar-uploader"
           action="http://127.0.0.1:80/getphoto"
           :show-file-list="false"
           :on-success="uploadSuccess"
           accept="image/*"
         >
           <img v-if="imageUrl" :src="imageUrl" class="avatar">
           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         </el-upload>
       </div>
     </div>
     <div class="edit_menu_right">
       <h2>{{userinfo.name}}</h2>
       <div class="infoitem">
         <p v-show="!jobshow"><span>职业</span> {{userinfo.job}} <el-button @click="()=>{this.jobshow=true}">修改</el-button></p>
         <input type="text" v-show="jobshow" v-model="userinfo.job">
         <el-button  v-show="jobshow" @click="()=>{this.jobshow=!this.jobshow}">确认</el-button>
       </div>
       <div class="infoitem">
         <p v-show="!introshow"><span>个人简介</span> {{userinfo.intro}} <el-button @click="()=>{this.introshow=true}">修改</el-button></p>
         <input type="text" v-show="introshow" v-model="userinfo.intro">
         <el-button  v-show="introshow" @click="()=>{this.introshow=!this.introshow}">确认</el-button>
       </div>
       <div class="infoitem">
         <p v-show="!idshow"><span>修改ID</span> {{userinfo.id}} <el-button @click="()=>{this.idshow=true}">修改</el-button></p>
         <input type="text" v-show="idshow" v-model="userinfo.id">
         <el-button  v-show="idshow" @click="()=>{this.idshow=!this.idshow}">确认</el-button>
       </div>
       <div class="infoitem">
         <p v-show="!telshow"><span>手机号</span> {{userinfo.tel}} <el-button @click="()=>{this.telshow=true}">修改</el-button></p>
         <input type="text" v-show="telshow" v-model="userinfo.tel">
         <el-button  v-show="telshow" @click="()=>{this.telshow=!this.telshow}">确认</el-button>
       </div>
       <div class="confirm">
         <el-button @click="upload(userinfo)">确认修改</el-button>
       </div>
     </div>
   </div>
 </div>
</div>
</div>
</template>

<script>

import axios from "axios";
import Navs from "@/views/Nav/Nav";
export default {
  name: 'edit',
  components: {
    Navs
  },

  props: [

  ],
  data: function () {
    return {
      userid: '',
      userinfo: {},
      jobshow: false,
      introshow: false,
      idshow:false,
      telshow:false,
      imageUrl:'./icon/img_1.png'
    }
  },
  watch:{

  },
  methods: {
    getuserinfo(username) {
      axios
        .post('http://127.0.0.1:80/queryuserinfobyname?id='+username)
        .then(res => {
          this.userinfo = res.data[0]
        })
    },
    upload(userinfo){
      console.log(userinfo)
      axios
      .post(`http://127.0.0.1:80/updateuserinfo?username=${userinfo.name}&job=${userinfo.job}&intro=${userinfo.intro}&id=${userinfo.id}&tel=${userinfo.tel}&icon=${userinfo.icon}&password=${userinfo.password}`)
      .then(res=>{
          alert('个人资料更新成功')
          this.$router.push({
          path:'/Userindex',
          query:{
            username: this.$store.state.username
          }
        })
      })
    },
    uploadSuccess(res, file) {
      this.imageUrl = res
      this.userinfo.icon = this.imageUrl
    },



  },
  mounted() {
     this.userid = this.$route.query.userid
    this.getuserinfo(this.userid);
    console.log(this.userinfo)
    this.imageUrl = this.$store.state.icon
  },



}
</script>

<style scoped lang="less">
@import 'edit.less';
</style>
