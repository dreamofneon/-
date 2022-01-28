import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    token: '',
    username: '',
    userid: '',
    intro: '',
    icon: '',
  },
  mutations: {
    pass() {
      this.state.token = '';
    },
    turnlogin() {
      this.state.islogin = true
    },
    login: (state, param) => {
      state.islogin = true;
      state.userid = param.id
      axios
        .post('http://127.0.0.1:80/queryuserinfo?id=' + param.id)
        .then(res => {
          state.username = res.data[0].name
          state.intro = res.data[0].intro
          state.icon = res.data[0].icon
        })
    }

  },
  actions: {}
})
