<template>
  <div class="regist">
      <div class="regist_body">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="账号名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirm"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="请从中选择您感兴趣的话题">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="生活方式" name="type"></el-checkbox>
              <el-checkbox label="经济" name="type"></el-checkbox>
              <el-checkbox label="运动" name="type"></el-checkbox>
              <el-checkbox label="艺术" name="type"></el-checkbox>
              <el-checkbox label="阅读" name="type"></el-checkbox>
              <el-checkbox label="互联网" name="type"></el-checkbox>
              <el-checkbox label="美食" name="type"></el-checkbox>
              <el-checkbox label="动漫" name="type"></el-checkbox>
              <el-checkbox label="足球" name="type"></el-checkbox>
              <el-checkbox label="摄影" name="type"></el-checkbox>
              <el-checkbox label="文化" name="type"></el-checkbox>
              <el-checkbox label="旅行" name="type"></el-checkbox>
              <el-checkbox label="游戏" name="type"></el-checkbox>
              <el-checkbox label="电影" name="type"></el-checkbox>
              <el-checkbox label="音乐" name="type"></el-checkbox>
              <el-checkbox label="设计" name="type"></el-checkbox>
              <el-checkbox label="法律" name="type"></el-checkbox>
              <el-checkbox label="时事" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="自我介绍">
            <el-input type="textarea" v-model="form.intro"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即注册</el-button>
            <el-button @click="returnlogin">返回登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'regist',
  props: [],
  data() {
    return {
      form: {
        name: '',
        intro:'',
        pwd:'',
        confirm:'',
        tel:'',
        type:[]
      }
    }
  },
  watch: {},
  methods: {
    onSubmit() {
       axios
       .post(`http://127.0.0.1:80/regist?name=${this.form.name}&intro=${this.form.intro}&pwd=${this.form.pwd}&tel=${this.form.tel}&type=${this.form.type}`)
      .then(res=>{
        console.log('看看')
        console.log(res)
        if(res.data=='-1'){
          alert('该用户名或手机号已经被他人注册')
        }else if(res.data=='0'){
          alert('注册失败，目前并不是对外开放注册时间')
        }else{
          alert('注册成功，欢迎来到neon')
          localStorage.setItem('islogin',true)
          localStorage.setItem('userid',res.data)
          this.$store.commit('login',{id:res.data})
          this.$router.push('/');
        }
      })
    },
    returnlogin(){
      this.$emit('returnlogin',false)
    }
  },
  mounted() {

  },


}
</script>

<style scoped lang="less">
@import 'regist.less';
</style>
