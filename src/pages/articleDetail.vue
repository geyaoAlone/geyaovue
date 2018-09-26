<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo" @click="firstPage()">«返回首页</div>
      <!--
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="login()">登录</a></li>
      </ul>
      -->
    </div>
    <div class="layui-body">
      <blockquote class="layui-elem-quote">
        2018年07月24日 葛耀的网站正式上线了！
      </blockquote>
      <div class="content_center white_bg">
          <div class="detail_title">{{detailInfo.title}}</div>
          <div v-html="detailInfo.content"></div>
      </div>
    </div>
    <div class="layui-footer" style="left:0px;">
      <!-- 底部固定区域 -->
      © geyao
    </div>
  </div>
</template>

<script>
export default {
  name: '详情页',
  data: function () {
    return {
      detailInfo: {}
    }
  },
  methods: {
    firstPage () {
      this.$router.push({path: 'firstPage'})
    }

  },
  created: function () {
    this.$http.post('/findBlogsById.do', {blogid:this.$route.query.blogid}
    ).then(result => {
      console.info(typeof result)
      this.detailInfo = result.blog
    })
  }
}
</script>

<style >
  .layui-elem-quote{
    background-color: #ffffff;
  }
  .content_center{
    margin-left: 250px;
    margin-right: 250px;
    padding-left: 50px;
    padding-right: 50px;
  }
  .layui-logo{
    color:#fff!important;
  }
  .white_bg{
    background:#fff!important ;
  }
  .layui-body{
    left: 0px;
  }
  .layui-elem-quote{
    margin-top: 7px;
  }
  .detail_title{
    text-align: center;
    display: block;
    font-size: 23px;
    font-weight: 500;
  }

</style>
