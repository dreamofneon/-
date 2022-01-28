<template>
<div >
 <Nav></Nav>
  <div class="message_body">
     <div class="message_box">
          <div class="box_left">
               <div class="left_nav">
                 <div class="nav_input">
                   <el-input>搜索联系人</el-input>
                 </div>

                 <el-collapse accordion>
                   <el-collapse-item>
                     <template slot="title" >
                       最近联系
                     </template>
                     <div class="left_all">
                       <div class="left_item" v-for="item in this.chatlist" @click="changetarget(item.name)">
                         <img :src="item.icon" alt="">
                         <div>
                           <h3>{{item.name}}</h3>
                           <p>{{item.intro}}</p>
                         </div>

                       </div>
                     </div>

                   </el-collapse-item>
                 </el-collapse>
               </div>
          </div>
          <div class="box_right">
            <div class="right_nav">
             {{this.targetname}}
         </div>
            <div class="right_body">
                 <div v-for="item in this.messagebox" :class="item.username==username?'messageboxright':'messageboxleft'">
                   <div v-if="item.username==username" class="box_item" >
                     <p>{{item.message}}</p>
                     <span><img :src="item.icon" alt=""></span>
                   </div>
                   <div v-if="item.username!=username" class="box_item">

                     <span><img :src="item.icon" alt=""></span>
                     <p>{{item.message}}</p>
                   </div>


                 </div>
            </div>
            <div class="right_input">
              <textarea name="" id="" cols="30" rows="10" v-model="message" @keyup.enter="send">

              </textarea>
              <el-button @click="send">发送</el-button>
            </div>
          </div>
     </div>

  </div>
</div>
</template>

<script>

import axios from "axios";
import Nav from "@/views/Nav/Nav";

let ws = new WebSocket('ws://127.0.0.1:3000')

ws.onopen=(username)=>{
  console.log('卧槽我在拔刀')
     ws.send(
       JSON.stringify({
         type:'setName',
         nickname : username
       }))
}


ws.onmessage = (evt)=>{
  console.log(evt)
  console.log('这里是尝试调用vue方法')
  getmessage(evt.data)
}



ws.onclose = ()=>{
  console.log('连接结束')
}


export default {
  name: 'message',
  props: [

  ],
  components:{
    Nav
  },
  data() {
    return {
      messagelist:[1,1,1,1],
      messagebox:[
      ],
      message:'',
      chatlist:[],
      targetname:'',
      username:''
    }
  },
  watch:{

  },
  methods: {
      enter(){
        ws.onopen(this.$store.state.username)
      },
    send(){
      console.log(`这里的nickname是${this.$store.state.username}`)
      ws.send(JSON.stringify({
           type:'chat',
           nickname:this.$store.state.username,
           message:this.message,
           target:this.targetname,
           icon:this.$store.state.icon
      }))
    },
    sendnext(evt){
      const data =JSON.parse(evt)
      this.messagebox.push({
        message: data.message,
        icon : data.icon,
        username : data.name
      })
      console.log(data)
      this.message = ''
      this.clearnotice()

    },
    getchatlist(userid){
        axios
      .get(`http://127.0.0.1:80/getchatlist?userid=${userid}`)
      .then(res=>{
        this.chatlist = res.data
      })
    },
    changetarget(username){

      this.targetname = username
      this.changebox()
    },
    changebox(){
      axios
        .get(`http://127.0.0.1:80/getmessage?username=${this.$store.state.username}&target=${this.targetname}`)
        .then(res=>{
          this.messagebox = res.data
        })
     this.clearnotice()
    },
    clearnotice(){
      axios
        .post(`http://127.0.0.1:80/clearnotice?username=${this.username}&targetname=${this.targetname}`)
        .then(res=>{

        })
    }

  },
  mounted() {
     this.enter()
    this.getchatlist(this.$store.state.userid)
    this.username = this.$store.state.username;
    window.getmessage = this.sendnext;
  },
  destroyed() {

  }


}
</script>

<style scoped lang="less">
@import 'message.less';
</style>
