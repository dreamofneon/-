<template>
  <div class="service">
    <div class="create">
      <div class="create_nav">
        <p><span>
             <img src="./icon/human.svg" alt=""> 创作中心 Lv{{ userinfo.level }}
        </span>
          <span>{{this.$store.state.username}}</span></p>
      </div>
      <div class="item_list">
        <div v-for="item in perlist" class="choose" @click="turntocreator(item.path)">
          <img :src="item.icon" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="scroll">
        <el-carousel indicator-position="outside" height="80px"  >
          <el-carousel-item v-for="item in poem" :key="item">
            <div class="carousel">
              <div class="carouselright">
                <img src="./icon/下载.jpg" alt="">
              </div>
              <div class="carouselleft">
                 <h3>{{item.up}}</h3>
                <p>{{item.down}}</p>
              </div>

            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <button class="createe" @click="createe">进入创作中心</button>
    </div>
    <div class="globalsidelist">
      <div class="announcement">
        <h3>公告栏 <p @click="gotoannounceindex">查看更多</p></h3>
        <h4 v-for="item in announce">
          <span @click="gotoannounceitem(item.title)">{{item.title}}</span><span>{{item.arthur}}</span>
        </h4>

      </div>
    </div>
    <div class="navlist">
      <div v-for="item in navlist" class="navlist_item">
        <span><img :src="item.icon" alt=""></span>
        <span @click="turnto(item.id)">{{ item.name }}</span>
      </div>
    </div>
  </div>

</template>

<script>

import axios from "axios";
import article from './icon/发文章.svg'
import tip from './icon/提示.svg'
import video from './icon/视频.svg'
import idea from './icon/问题单.svg'
import 专栏     from './icon/专栏.svg'
import 书店     from './icon/书店.svg'
import  付费咨询    from './icon/付费咨询.svg'
import  现场    from './icon/现场.svg'
import  圆桌    from './icon/圆桌.svg'
import  百科    from './icon/百科.svg'
import   收藏      from  './icon/收藏.svg'
import   关注      from  './icon/3.1关注.svg'
import   邀请      from  './icon/我的邀请.svg'
import   余额      from  './icon/我的余额.svg'
import   站务      from  './icon/帮助中心.svg'
import   帮助      from  './icon/帮助.svg'
export default {
  name: 'service',
  components: {},
  data() {
    return {
      level: 4,
      icon:'./icon/human.svg',
      perlist: [
        {
          name: '回答问题',
          icon: idea,
          path:'searchpage',
        },

        {
          name: '内容管理',
          icon: video,
          path:'contentmanage',
        },

        {
          name: '近期热点',
          icon: article,
          path:'hot',
        },

        {
          name: '内容分析',
          icon: idea,
          path:'contentanalyse',
        },
      ],
      globalsidelist: [
        {
          name: 'Live',
          icon: 现场,
        },

        {
          name: '书店',
          icon:书店,
        },

        {
          name: '圆桌',
          icon: 圆桌,
        },

        {
          name: '专栏',
          icon: 专栏,
        },

        {
          name: '付费咨询',
          icon: 付费咨询,
        },

        {
          name: '百科',
          icon: 百科,
        },
      ],
      announce:[],
      navlist: [
        {
          name: '我的收藏',
          icon:收藏,
          id: 0,
        },

        {
          name: '我的关注',
          icon:关注,
          id: 1,
        },


        {
          name: '站务中心(等级达到Lv3开启)',
          id: 2,
          icon:站务,
        },

        {
          name: '帮助与客服',
          id: 3,
          icon:帮助,
        },
      ],
      scrolldata:[1,2,3],
      userinfo:{},
      poem:[
        {
          up:'愿我如星君如月',
          down:'夜夜流光相皎洁'
        },
        {
          up:'日照虹霓似',
          down:'天清风雨闻'
        },
        {
          up:'且将新火试新茶',
          down:'诗酒趁年华'
        },

      ]
    }
  },
  methods: {
    getuserinfo(username) {
      axios
        .post('http://127.0.0.1:80/queryuserinfobyname?id=' + username)
        .then(res => {
          console.log(res)
          this.userinfo = res.data[0]
        })
    },
    createe(){
      this.$router.push({
        path:'/creatorindex'
      })
    },
    turntocreator(name){
      this.$router.push({
        path:`/${name}`
      })
    },
    gotoannounceindex(){
      this.$router.push({
        path:'/announceindex'
      })
    },
    gotoannounceitem(name){
      this.$router.push({
        path:'/announceitem',
        query:{
          title : name
        }
      })
    },
    getannounce(){
      axios.get(` http://127.0.0.1:80/getannounce`)
        .then(res=>{
          this.announce = res.data
        })
    },
    turnto(id){
      if(id==0){
           this.$router.push({
             path:'/Userindex',
             query:{
               username: this.$store.state.username,
               nav : '收藏'
             }
           })
      }else if(id==1){
        this.$router.push({
          path:'/Userindex',
          query:{
            username: this.$store.state.username,
            nav : '关注'
          }
        })
      }else if(id==2){
        this.$router.push({
          path:'/announce',
        })
      }else if(id==3){
        this.$router.push({
          path:'/help'
        })
      }
    }
  },
  mounted() {
   this.getuserinfo(this.$store.state.username)
    this.getannounce()
  },


}
</script>

<style scoped lang="less">
@import 'Service.less';
</style>
