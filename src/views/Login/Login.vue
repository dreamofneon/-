<template>
  <div class="login">
    <div class="logo">
      <h1>霓虹</h1>
      <p>霓虹一梦，世界冷清</p>
    </div>
    <div class="body" v-if="!showregist">
      <div class="body_head">
        <div class="body_head_item" v-for="item in this.login_item" @click="changetab(item)">
          <p>{{ item }}</p>
        </div>
      </div>
      <div class="body_index" v-show="istel">
        <div class="body_index_input">
          <el-input placeholder="请输入手机号码" v-model="tel">
            <el-button slot="prepend">{{ tel_front }}</el-button>
          </el-input>
        </div>
        <div class="body_index_input">
          <el-input placeholder="输入6位短信验证码" v-model="code">
            <el-button slot="append">{{ code_back }}</el-button>
          </el-input>
        </div>
      </div>
      <div class="body_index" v-show="!istel">
        <div class="body_index_input">
          <el-input placeholder="账号" v-model="id" class="el_input">

          </el-input>
        </div>

        <div class="body_index_input">
          <el-input placeholder="密码" v-model="pwd" class="el_input"  show-password>

          </el-input>
        </div>

      </div>
      <div @click=login()>
        <el-button class="btn">登陆</el-button>
      </div>
      <div>
        <p style="margin-left: 32px;margin-right: 32px">未注册手机验证后自动登录，注册即代表同意我们所有的条款</p>
      </div>
      <el-button class="btn" @click="showpageregist">还未注册？点击注册</el-button>

    </div>
    <div v-if="showregist">
          <regist @returnlogin="returnlogin"></regist>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import router from "@/router/router";
import regist from "@/components/regist/Regist";


export default {
  name: 'login',
  components:{
    regist
  },
  data() {
    return {
      showregist:false,
      login_item: [
        '免密码登陆',
        '密码登录',
      ],
      tel: '',
      tel_front: '中国+86',
      code: '',
      code_back: '获取短信验证码',
      id: '',
      pwd: '',
      istel: false,
    }
  },
  methods: {

    login() {
      axios
        .get('http://127.0.0.1:80/login?name=' + this.id + '&pwd=' + this.pwd)
        .then(res => {
          console.log(res)
          if(res.data){
            this.$store.commit('login',{id:this.id})
            localStorage.setItem('islogin',true)
            localStorage.setItem('userid',this.id)
            this.$router.push('/');
          }else{
            alert('账号或密码错误')
          }
        })
    },
    changetab(item) {
      if (item == '免密码登陆') {
        this.istel = true
      } else {
        this.istel = false
      }
    },
    showpageregist(){
      this.showregist = true
    },
    returnlogin(data){
      this.showregist = data
    }
  },
  mounted() {
    this.$store.state.islogin = false
  },


}
</script>

<style scoped lang="less">
@import './login.less';
</style>
