<template>
<div class="creatornav">
   <p>
     <span @click="goindex">霓 虹</span>
     <span><img :src="this.$store.state.icon" alt=""></span>
   </p>
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

    }
  },
  watch:{

  },
  methods: {
    goindex() {
      this.$router.push('/')
    },
  },
  mounted() {

  },



}
</script>

<style scoped lang="less">
@import 'Creatornav.less';
</style>
