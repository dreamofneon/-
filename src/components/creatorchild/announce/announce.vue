<template>

<div>
  <div class="ques_editor" id="editor">

  </div>
  <p class="title">标题：<input type="text" v-model="title"></p>
  <el-button @click="addannounce">发布公告</el-button>
</div>
</template>

<script>

import axios from "axios";
import E from 'wangeditor'
export default {
  name: '',
  props: [

  ],
  data() {
    return {
      editor: null,
      title:'',
      user:{}
    }
  },
  watch:{

  },
  methods: {
   addannounce(){
     axios
       .post(`http://127.0.0.1:80/addannounce?title=${this.title}&announce=${this.editor.txt.html()}&arthur=${this.$store.state.username}&text=${this.editor.txt.text()}`,)
       .then(res => {
         this.$nextTick(() => {
           if (res.data == 1) {
             alert('发布成功')
             this.$router.push({
               path:'/creatorindex'
             })
           }
         })
       })
   },
    getuser(name){
      axios
        .post('http://127.0.0.1:80/queryuserinfobyname?id=' + name)
        .then(res => {
          this.user = res.data[0]
          if(this.user.level<3){
            alert('您现在的等级还不够发布公告，即将返回创作中心')
            this.$router.push({
              path:'/creatorindex'
            })
          }
        })

    }
  },
  mounted() {

    this.getuser(this.$store.state.username)

    this.editor = new E(`#editor`)
    this.editor.config.zIndex = 10
    this.editor.create()
  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'announce.less';
</style>
