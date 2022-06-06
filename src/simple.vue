<template>
  <div class="index">
  <h3>{{data}}</h3>
  </div>
</template>

<script>

import axios from "axios";


export default {
  name: 'simple',
  components: {

  },
  data() {
    return {
        data: ''
    }
  },
  methods: {
        getdata(){
          setTimeout(()=>{
            this.data = '666'
          },1000)
        }
  },
  mounted(){
    this.getdata()
  }


}
</script>

<style scoped lang="less">

</style>
