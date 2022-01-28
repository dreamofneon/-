import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home/Home";
import login from "@/views/Login/Login";
import userindex from "@/views/Userindex/Userindex";
import Question from "@/views/question/Question";
import search from "@/views/search/Search";
import message from "@/views/message/message"
import Edit from "@/views/edit/edit";
import Collection from "@/views/collection/Collection";
import Explore from "@/views/explore/Explore";
import creator from "@/views/creator/Creator";
import index from "@/components/creatorchild/hot/hot";
import newpage from "@/components/creatorchild/new/new";
import searchpage from "@/components/creatorchild/search/search"
import searchreturn from "@/components/creatorchild/searchreturn/searchreturn";
import recommend from "@/components/creatorchild/recommend/recommend";
import commentmanage from "@/components/creatorchild/commentmanage/commentmanage";
import contentmanage from "@/components/creatorchild/contentmanage/contentmanage";
import contentanalyse from "@/components/creatorchild/contentanalyse/contentanalyse";


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/Userindex',
      name: 'userindex',
      component: userindex
    },
    {
      path: '/Question',
      name: 'question',
      component: Question
    },
    {
      path:'/Search',
      name:'search',
      component:search
    },
    {
      path:'/Message',
      name:'message',
      component:message
    },
    {
      path:'/Edit',
      name:'edit',
      component:Edit
    },
    {
      path:'/Collection',
      name: 'collection',
      component:Collection
    },{
      path:'/Explore',
      name:'explore',
      component:Explore
    },{
      path:'/Creator',
      name:'creator',
      component:creator,
      children:[
        {
           path:'/hot',
           name:'hot',
          component:index
        },
        {
          path:'/new',
          name:'new',
          component:newpage
        },
        {
          path:'/searchpage',
          name:'search',
          component:searchpage
        },
        {
          path:'/searchreturn',
          name:'searchreturn',
          component:searchreturn
        },
        {
          path:'/recommend',
          name:'recommend',
          component:recommend
        },
        {
          path:'/commentmanage',
          name:'commentmanage',
          component:commentmanage
        },
        {
          path:'/contentmanage',
          name:'contentmanage',
          component:contentmanage
        },
        {
          path:'/contentanalyse',
          name:'contentanalyse',
          component:contentanalyse
        }
      ]
    }


  ]
})
