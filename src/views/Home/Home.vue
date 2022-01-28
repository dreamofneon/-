<template>

  <div>
    <Navs></Navs>
<!--    <Button @click="tologin()">登陆</Button>-->
    <div class="index">
      <div class="index_left">
        <index></index>
      </div>
       <div class="index_right">
        <service></service>
       </div>

    </div>

  </div>

</template>

<script>
import Navs from '@/views/Nav/Nav'
import index from "@/views/Index/Index";
import service from "@/views/service/Service";

export default {
  name: 'Home',
  components: {
    Navs, index,service
  },
  methods: {
    tologin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
@import 'Home.less';
</style>
