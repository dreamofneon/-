<template>
  <div class="regist">
      <div class="regist_body">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="账号名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" >
            <el-input v-model="form.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input v-model="form.confirm" show-password></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="请从中选择您感兴趣的话题" prop="topic">
            <el-checkbox-group v-model="form.type">
              <span v-for="item in topiclist" style="margin: 5px">
                <el-checkbox :label="item" name="type"></el-checkbox>
              </span>
<!--              <el-checkbox label="生活方式" name="type"></el-checkbox>-->
<!--              <el-checkbox label="经济" name="type"></el-checkbox>-->
<!--              <el-checkbox label="运动" name="type"></el-checkbox>-->
<!--              <el-checkbox label="艺术" name="type"></el-checkbox>-->
<!--              <el-checkbox label="阅读" name="type"></el-checkbox>-->
<!--              <el-checkbox label="互联网" name="type"></el-checkbox>-->
<!--              <el-checkbox label="美食" name="type"></el-checkbox>-->
<!--              <el-checkbox label="动漫" name="type"></el-checkbox>-->
<!--              <el-checkbox label="足球" name="type"></el-checkbox>-->
<!--              <el-checkbox label="摄影" name="type"></el-checkbox>-->
<!--              <el-checkbox label="文化" name="type"></el-checkbox>-->
<!--              <el-checkbox label="旅行" name="type"></el-checkbox>-->
<!--              <el-checkbox label="游戏" name="type"></el-checkbox>-->
<!--              <el-checkbox label="电影" name="type"></el-checkbox>-->
<!--              <el-checkbox label="音乐" name="type"></el-checkbox>-->
<!--              <el-checkbox label="设计" name="type"></el-checkbox>-->
<!--              <el-checkbox label="法律" name="type"></el-checkbox>-->
<!--              <el-checkbox label="时事" name="type"></el-checkbox>-->

            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="自我介绍" prop="intro">
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: '',
        intro:'',
        pwd:'',
        confirm:'',
        tel:'',
        type:[]
      },
      topiclist:[],
      rules:{
        pwd:[
          {required:true,message:'请输入用户名称',trigger:'blur'},
          {min:2,max:16,message:'长度在2到16个字符之间',trigger: 'blur'}
        ],
        name:[
             {required:true,message:'请输入密码',trigger:'blur'},
             {min:2,max:16,message:'长度在2到16个字符之间',trigger: 'blur'}
           ],
        confirm:[
          {required:true,message:'请再次确认密码',trigger:'blur'},
          { validator: validatePass2, trigger: 'blur' }
        ],
        tel:[
          {required:true,message:'请输入电话号码',trigger:'blur'},
          {min:2,max:13,message:'长度在2到13个数字之间',trigger: 'blur'},
        ],

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
          alert(`注册成功，欢迎来到霓虹，您的id为${res.data}，id可以用来登陆账号，您可以在个人页面修改修改您的id`)
          localStorage.setItem('islogin',true)
          localStorage.setItem('userid',res.data)
          this.$store.commit('login',{id:res.data})
          this.$router.push('/');
        }
      })
    },
    returnlogin(){
      this.$emit('returnlogin',false)
    },
    gethottopic(){
      axios
        .get(`http://127.0.0.1:80/gethottopic`)
        .then(res=>{
          this.topiclist = res.data.splice(0,20)
        })
    },
  },
  mounted() {
      this.gethottopic()
  },


}
</script>

<style scoped lang="less">
@import 'regist.less';
</style>
