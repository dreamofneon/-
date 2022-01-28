<template>
  <div class="index">

  </div>

</template>

<script>

import axios from "axios";


export default {
  name: 'Userindex',
  components: {
 
  },
  data() {
    return {

    }
  },
  methods: {
    getArtList() {
      axios
        .get('http://127.0.0.1:80/getartlist')
        .then(res => {
          console.log(res)
          for (let item of res.data) {
            item.nexttext = item.text.substring(0, 80)
          }
          this.article_array = res.data

        })
    },

  },
  mounted() {

  },


}
</script>

<style scoped lang="less">

</style>
