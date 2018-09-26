<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo">欢迎您，{{userInfo.nickname}}</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-bg-green layui-layout-left">
        <li class="layui-nav-item layui-this">
          <a href="javascript:;" @click="thisPage(userInfo.usename)">我的博客</a>
        </li>
        <li class="layui-nav-item" v-if="userInfo.usetype =='0'">
          <a href="javascript:;" @click="updateWebInfo()">更新日志</a>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="logout()">退出登陆</a></li>
      </ul>
    </div>

    <div class="layui-body">
    </div>
    <div class="layui-footer" style="left:0px;">
      <!-- 底部固定区域 -->
      © geyao
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-blog',
  data: function () {
    return {
      detailInfo: {}
    }
  },
  methods: {
    thisPage (usename) {
      this.$router.push({path: 'myBlogs', query: {usename: this.$route.query.usename}})
    }

  },
  created: function () {
    this.$http.post('/findBlogsById.do', this.$route.query
    ).then(result => {
      console.info(typeof result)
      this.detailInfo = result.blog
    })
  }
}
</script>

<style scoped>

</style>
