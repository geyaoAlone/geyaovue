<template>
  <div class="lay-blog">
    <div class="header">
      <div class="header-wrap">
        <h1 class="logo pull-left">
          <a href="javascript:;" @click="firstPage()">
            <img src="../../static/geyao_logoNew1.png" alt="" class="logo-img">
          </a>
        </h1>
        <div class="blog-nav pull-right">
          <ul class="layui-nav pull-left">
            <li class="layui-nav-item "><a href="javascript:;" @click="firstPage()">首页</a></li>
            <li class="layui-nav-item"><a href="javascript:;" @click="goMessage()">留言</a></li>
            <li class="layui-nav-item layui-this" ><a href="javascript:;" @click="queryWebsiteUpdateInfo()">关于小站</a></li>
          </ul>
          <a href="javascript:;" class="personal pull-left" @click="login()">
            <i class="layui-icon layui-icon-username"></i>
          </a>
        </div>
        <div class="mobile-nav pull-right" id="mobile-nav">
          <a href="javascript:;">
            <i class="layui-icon layui-icon-more"></i>
          </a>
        </div>
      </div>
      <ul class="pop-nav" id="pop-nav">
        <li><a href="index.html">首页</a></li>
        <li><a href="message.html">留言</a></li>
        <li><a href="about.html">关于</a></li>
      </ul>
    </div>
    <div class="container-wrap">
      <div class="container">
        <div class="contar-wrap">
          <h4 class="item-title">
            <p><i class="layui-icon layui-icon-speaker"></i><span>小站功能技术更新时间线</span></p>
          </h4>
          <div class="time_line">
            <ul class="layui-timeline" v-for="(item ,i) in itemList" :key="i">
              <li class="layui-timeline-item">
                <i class="layui-icon layui-timeline-axis"></i>
                <div class="layui-timeline-content layui-text">
                  <h3 class="layui-timeline-title" >{{item.title}}</h3>
                  <p>
                    <span>{{item.time}}</span>
                    <span class="timeline_content" v-html="item.content"></span>
                  </p>
                </div>
              </li>
            </ul>
          </div>



        </div>
      </div>
    </div>
    <div class="footer">
      <p>
        <span>&copy; 2018</span>
        <span><a href="http://www.geyaoln.xin" target="_blank">geyaoln.xin</a></span>
        <span>3Q 老丁&emsp;&emsp;京ICP备18050188号-1</span>
      </p>
      <p><span>孤独是一场修行</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data: function () {
    return {
      itemList: []
    }
  },
  methods: {
    login: function () {
      let _this = this
      var index = layer.open({
        type: 1,
        title: '',
        skin: 'layui-layer-rim',
        area: ['350px', '300px'],
        content: '<div class="login layui-form" onkeydown="keyLogin();">' +
        '      <img src="../../static/geyao_logoimg.png" alt="" class="logo-img login_img">' +
        '      <div class="layui-form-item login_layer">' +
        '        <label class="layui-form-label">登录名：</label>' +
        '        <div class="layui-input-inline">' +
        '          <input type="text" placeholder="请输入登录名" class="layui-input" id="usename">' +
        '        </div>' +
        '        <div class="layui-form-mid layui-word-aux"></div>' +
        '      </div>' +
        '      <div class="layui-form-item">' +
        '        <label class="layui-form-label">密&emsp;码：</label>' +
        '        <div class="layui-input-inline">' +
        '          <input type="password" class="layui-input" placeholder="请输入密码" id="password">' +
        '        </div>' +
        '        <div class="layui-form-mid layui-word-aux"></div>' +
        '      </div>' +
        '  </div>',
        btn: ['登陆'],
        yes: function (index, layero) {
          _this.$options.methods.goLogin(_this, index)
        }
      })
    },
    goLogin (_this, index) {
      var params = {usename: $('#usename').val(), passwd: $('#password').val()}
      if (!params.usename || !params.passwd) {
        layer.msg('参数为空！')
        return
      }
      _this.$http.post('/checkLogin.do', params
      ).then(result => {
        if (result === '1') {
          layer.msg('登陆成功！', {time: 1500}, function () {
            layer.close(index)
            _this.$router.push({path: 'myBlogs', query: {usename: params.usename}})
          })
        } else {
          layer.msg('登陆失败！')
        }
      })
    },
    firstPage () {
      this.$router.push({path: 'firstPage'})
    },
    queryWebsiteUpdateInfo () {
      this.$router.push({path: 'websiteUpdateinfo'})
    },
    goMessage () {
      this.$router.push({path: 'leaveMessage'})
    }
  },
  created: function () {
    this.$http.post('/findAllTimeline.do', {}
    ).then(result => {
      console.info(typeof result)
      this.itemList = result
    })
  }

}
</script>

<style scoped>
  .layui-logo{
    color:#fff!important;
  }
  .time_line{
    background: #fff;
    padding: 25px;
    margin-top: 15px;
  }
  .detail_title{
    text-align: center;
    display: block;
    font-size: 23px;
    font-weight: 500;
  }
</style>
