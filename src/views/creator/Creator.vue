<template>
  <div>
    <Creatornav></Creatornav>
    <div class="creatorindex">
      <div class="creator_left">
        <h3><img src="./icon/主页.svg" alt=""><router-link to="/creatorindex">主页</router-link></h3>
        <el-collapse v-model="createnavs">
          <el-collapse-item title="创作" name="1">
            <h4 v-for="item in createnavs" v-if="item!='1'">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </h4>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="managenavs">
          <el-collapse-item title="管理" name="1">
            <h4 v-for="item in managenavs" v-if="item!='1'">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </h4>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="datanavs">
          <el-collapse-item title="数据分析" name="1">
            <h4>
              <router-link to="/contentanalyse">内容分析</router-link>
            </h4>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="creator_right">
        <h3>霓虹一梦，世界清冷</h3>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Creatornav from "@/views/creatornav/Creatornav";


export default {
  name: 'creator  ',
  props: [],
  components: {
    Creatornav
  },
  data() {
    return {
      createnavs: [
        {
          path: '/hot',
          name: '创作热点'
        },
        {
          path: '/new',
          name: '潜力问题'
        },
        {
          path: '/recommend',
          name: '问题推荐'
        },
        {
          path: '/searchpage',
          name: '问题搜索'
        },
        '1',
      ],
      managenavs: [{
        path: '/contentmanage',
        name: '内容管理'
      },
        {
          path: '/commentmanage',
          name: '评论管理'
        },
        {
          path: '/managereport',
          name: '处理举报'
        },
        {
          path: '/announce',
          name: '发布公告'
        },
        '1',
      ],
      datanavs: ['1'],

    }
  },
  watch: {},
  methods: {
    turntohot(nav) {
      this.$router.push({
        path: 'Creator/hot'
      })
    },

  },
  mounted() {

  },


}
</script>

<style scoped lang="less">
@import 'Creator.less';
</style>
