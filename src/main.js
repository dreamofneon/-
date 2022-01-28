import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import * as path from "path";
import VueClipboard from "vue-clipboard2";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)
//


router.beforeEach((to,from,next) =>{
  if(to.name!='login'&&!localStorage.getItem('islogin')){
    alert('请重新登录')
    store.commit('turnlogin')
    next('/login')
  }
  else{
    if(localStorage.getItem('islogin')){
      store.commit('login',{id:localStorage.getItem('userid')})
    }
    setTimeout(()=>{
      next()
    },200)

  }

})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
