<template>
  <div class="service">
    <div class="create">
      <div class="create_nav">
        <p><span>
             <img src="./icon/human.svg" alt=""> 创作中心 Lv{{ level }}
        </span>
          <span>草稿箱 ( )</span></p>
      </div>
      <div class="item_list">
        <div v-for="item in perlist" class="choose">
          <img :src="item.icon" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="scroll">
        <el-carousel indicator-position="outside" height="80px"  >
          <el-carousel-item v-for="item in 3" :key="item">
            <div class="carousel">
              <div class="carouselright">
                <img src="./icon/下载.jpg" alt="">
              </div>
              <div class="carouselleft">
                 <h3>你不要说话太坦白</h3>
                <p>搞得我心里好悲哀</p>
              </div>

            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <button class="createe">进入创作中心</button>
    </div>
    <div class="globalsidelist">
      <div v-for="item in globalsidelist" class="globalsidelist_item">
        <img :src="item.icon" alt="">
        <p>
          {{ item.name }}
        </p>

      </div>
    </div>
    <div class="navlist">
      <div v-for="item in navlist" class="navlist_item">
        <span><img :src="item.icon" alt=""></span>
        <span>{{ item.name }}</span>
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
        },

        {
          name: '发视频',
          icon: video,
        },

        {
          name: '写文章',
          icon: article,
        },

        {
          name: '写想法',
          icon: idea,
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
      navlist: [
        {
          name: '我的收藏',
          icon:收藏,
          id: 0,
        },

        {
          name: '我关注的问题',
          icon:关注,
          id: 0,
        },

        {
          name: '我的邀请',
          id: 0,
          icon:邀请,
        },

        {
          name: '我的余额',
          id: 0,
          icon:余额,
        },

        {
          name: '站务中心',
          id: 0,
          icon:站务,
        },

        {
          name: '帮助与客服',
          id: 0,
          icon:帮助,
        },
      ],
      scrolldata:[1,2,3]
    }
  },
  methods: {
    getArtList() {
      axios
        .get('http://127.0.0.1:80/getartlist')
        .then(res => {
          console.log(res)
          for (let item of res.data) {
            item.text = item.text.substring(0, 80)
          }
          this.article_array = res.data

        })
    }
  },
  mounted() {

  },


}
</script>

<style scoped lang="less">
@import 'Service.less';
</style>
