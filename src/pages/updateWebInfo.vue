<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo">欢迎您，{{userInfo.nickname}}</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-bg-green layui-layout-left">
        <li class="layui-nav-item ">
          <a href="javascript:;" @click="thisPage(userInfo.usename)">我的博客</a>
        </li>
        <li class="layui-nav-item layui-this" v-if="userInfo.usetype =='0'">
          <a href="javascript:;" @click="updateWebInfo(userInfo.usenam)">更新日志</a>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="logout()">退出登陆</a></li>
      </ul>
    </div>

    <div class="layui-body">
      <button class="layui-btn layui-btn-normal add" @click="saveInfo(userInfo.usename)">
        <i class="layui-icon">&#xe608;</i> 添加
      </button>
      <div class="content">
        <div class="time_line">
          <ul class="layui-timeline" v-for="(item ,i) in itemList" :key="i">
            <li class="layui-timeline-item">
              <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <h3 class="layui-timeline-title" >{{item.title}}</h3>
                <p>
                  <span>{{item.time}}</span><br/>
                  <span v-html="item.content" style="font-size: 15px;color: #000000;"></span>
                </p>
              </div>
            </li>
          </ul>
        </div>
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
  name: 'update-web-info',
  data: function () {
    return {
      itemList: [],
      userInfo: {}
    }
  },
  methods: {
    thisPage (usename) {
      this.$router.push({path: 'myBlogs', query: {usename: usename}})
    },
    updateWebInfo: function (usename) {
      this.$router.push({path: 'updateWebInfo', query: {usename: usename}})
    },
    logout: function () {
      let _this = this
      var confirm = layer.confirm('确定要退出登录吗？'
        , {icon: 1}
        , function () {
          _this.$http.post('/loginOut.do', {usename: _this.userInfo.usename}
          ).then(result => {
            layer.close(confirm)
            _this.$router.push({path: 'firstPage'})
          })
        })
    },
    saveInfo(usename){
      let _this = this
      layer.open({
        type: 1,
        skin: 'layui-layer-rim',
        area: ['800px', '500px'],
        content: '<div class="save_content">' +
        '<input id="title" type="text" placeholder="标题" style="width:100%"/><br/>' +
        '<textarea id="content" placeholder="内容" style="width:100%;height: 344px;"></textarea>' +
        '</div>',
        btn: ['保存'],
        yes: function (index, layero) {
          var params = {title: $('#title').val(), content: $('#content').val(), usename: usename}
          if (!params.title || !params.content) {
            layer.msg('参数为空！')
            return
          }
          var content = params.content.replace(/\n/g, '_@').replace(/\r/g, '_#')
          content = content.replace(/_#_@/g, '<br/>')// IE7-8
          content = content.replace(/_@/g, '<br/>')// IE9、FF、chrome
          content = content.replace(/\s/g, '&nbsp;')// 空格处理
          params.content = content
          _this.$http.post('/saveTimeline.do', params
          ).then(result => {
            layer.msg(result, {time: 1000})
            location.reload([true])
          })
        }
      })
    }
  },
  created () {
    let author = this.$route.query.usename
    console.info(author)
    if (author === undefined || author === null || author === '') {
      layer.msg('请先登陆！', {time: 1000}, function () {
        _this.$router.push({path: 'firstPage'})
      })
    }
    let _this = this
    this.$http.post('/findAllTimeline.do', {usename: author}
    ).then(result => {
      console.info(result)
      if (!result) {
        layer.msg('请先登陆！', {time: 1000}, function () {
          _this.$router.push({path: 'firstPage'})
        })
      }
      _this.itemList = result.dataList
      _this.userInfo = result.user
    })
  }
}
</script>

<style scoped>
  .layui-logo{
    color:#fff!important;
  }
  .layui-body{
    background-color: #ffffff;
    left: 0px;
  }
  .content{
    margin-left:10px;
    margin-right: 10px;
    height: 100%;
    clear: both;
  }
  .save_content{
    margin:15px;
  }
  .save_content input{
    margin-bottom: 10px;
    height: 25px;
    padding-left: 7px;

  }
  .save_content #content{
    height: 44px;
    width: 260px;
    padding-left: 7px;
  }
  .add{
    float: right;
    margin: 20px 30px 10px;
  }
</style>
