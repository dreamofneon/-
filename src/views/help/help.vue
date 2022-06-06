<template>

<div>
<Nav></Nav>
  <div class="index">
    <div class="bodyd">
      <h3>帮助与客服</h3>
      <h4>常见问题</h4>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="怎样正确的使用举报功能" name="1">
          <div>如果您在知乎上有发现侵犯您个人或企业合法权益的内容，您可以点击反馈页面中的···，通过其中的举报功能进行举报，举报时请说明举报原因。我们会尽快的处理您的反馈。</div>

        </el-collapse-item>
        <el-collapse-item title="霓虹使用指南" name="2">
          <div>欢迎来到霓虹，一个中文互联网综合性知识内容平台</div>
          <div>在这里，无论是满足好奇，或者解答疑惑，你都有机会找到可信赖的解答。</div>
        </el-collapse-item>

      </el-collapse>
    </div>

  </div>
</div>
</template>

<script>

import Nav from "@/views/Nav/Nav";
import axios from "axios";

export default {
  name: '',
  components:{
    Nav
  },
  props: [

  ],
  data() {
    return {
      activeNames: ['1']
    }
  },
  watch:{

  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  mounted() {

  },
  // http://127.0.0.1:80/


}
</script>

<style scoped lang="less">
@import 'help.less';
</style>
