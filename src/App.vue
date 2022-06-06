<template>
  <div id="app" >

      <router-view :key="$route.fullPath"/>
  </div>
</template>


<script>

export default {
  name: 'App',
  components: {

  },
  methods: {

  },
  mounted() {
    console.log('这是app页面')

  }
}
</script>
<style>
body{
  background-color: #F6F6F6;
  margin: 0px;
  padding: 0px;
}
html{
  margin: 0px;
  padding: 0px;
}
*{
  margin: 0px;
  padding: 0px;
}
</style>
