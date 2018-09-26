
<template>

  <div class="layui-layout layui-layout-admin">

    <div class="layui-header layui-bg-green">
      <div class="layui-logo">葛耀的小站</div>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="login()">登录</a></li>
      </ul>
    </div>

    <div class="layui-body">
        <blockquote class="layui-elem-quote">
          2018年07月24日 葛耀的网站正式上线了！
        </blockquote>
        <div class="content">
          <div class="left-content">
              <div class="layui-row layui-col-space15" v-for="(item ,i) in itemList" :key="i">
                <div class="layui-col-md12">
                  <div class="layui-card">
                    <div class="layui-card-header">
                      <span @click="articleDetail(item.blogid)">{{item.title}}</span>
                      <div class="second">☞&nbsp;{{item.author}}&emsp;&emsp;&emsp;&emsp;☞&nbsp;{{item.time}}</div>
                    </div>
                    <div class="layui-card-body">
                      <span class="timeline_content" v-html="item.content"></span>
                      <a class="go_ready" @click="articleDetail(item.blogid)">阅读全文»</a>
                    </div>
                  </div>
                </div>
              </div>

            <!--
            <div class="time-line">
              <ul class="layui-timeline" v-for="(item ,i) in itemList" :key="i">
                <li class="layui-timeline-item">
                  <i class="layui-icon layui-timeline-axis"></i>
                  <div class="layui-timeline-content layui-text">
                    <h3 class="layui-timeline-title" >{{item.title}}</h3>
                    <p>☃&nbsp;{{item.author}}&emsp;&emsp;&emsp;&emsp;
                      ۩&nbsp;{{item.time}}<br/>
                      <span class="timeline_content" v-html="item.content"></span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            -->
          </div>
          <div class="right-content">
            <div class="small_chunk">
            <fieldset class="layui-elem-field site-demo-button">
              <legend>网站信息</legend>
              <div style="padding:20px">
                <a href="#" class="layui-btn" @click="queryWebsiteUpdateInfo()">更新日志</a>
              </div>
            </fieldset>
            </div>
            <div class="small_chunk">
            <fieldset class="layui-elem-field site-demo-button">
              <legend>所在公司友情连接</legend>
              <div style="padding:20px">
                <a href="https://www.rongxintong.com" class="layui-btn" target="_blank">融信通金服科技股份有限公司</a>
                <a href="http://jiaofei.rongxintong.com" class="layui-btn" target="_blank">云缴费</a>
              </div>
            </fieldset>
            </div>
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
  name: '我的首页',
  data: function () {
    return {
      height: $('.left-content').height(),
      itemList: []
    }
  },
  // 这里写方法比如给元素绑定事件等等
  methods: {
    login: function () {
      let _this = this
      var index = layer.open({
        type: 1,
        title: '登陆页',
        skin: 'layui-layer-rim',
        area: ['350px', '300px'],
        content: '<div class="login layui-form" onkeydown="keyLogin();">' +
        '       <h2>管理员登陆</h2>' +
        '      <div class="layui-form-item">' +
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
    articleDetail (blogid) {
      this.$router.push({path: 'articleDetail', query: {blogid:blogid}})
    },
    queryWebsiteUpdateInfo () {
      this.$router.push({path: 'websiteUpdateinfo'})
    }
  },
  created: function () {
    this.$http.post('/findAllBlogs.do', {}
    ).then(result => {
      console.info(typeof result)
      this.itemList = result.dataList
    })
  }
}
$(document).ready(function () {
  $('.left-content').css('min-height', $(window).height())
})
</script>
<style>
  .layui-elem-quote{
    background-color: #ffffff;
  }
  .layui-logo{
    color:#fff!important;
  }
  .layui-body{
    left: 0px;
    background-image:url(../../static/bg.jpg)!important;
  }
  .layui-elem-quote{
    margin-top: 7px;
  }
  .content{
    margin-left:10px;
    margin-right: 10px;
    /*height: 100%;*/
  }
  .left-content{
    display: inline-block;
    width: 70%;
  }
  .right-content{
    display: inline-block;
    float: right;
    padding: 5px;
    width: 29%;
  }
  .login h2{
    margin-top: 30px;
    margin-bottom: 15px;
    text-align: center;
  }
  .time-line{
    margin: 34px;
  }
  .timeline_content{
    font-size: 15px;
    color: #000000;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
  .layui-card-header{
    padding-top: 5px;
    height:65px;
    font-size: 20px;
  }
  .second{
    font-size: 14px;
    font-weight: 100;
    margin-top: -15px;
  }
  .go_ready{
    color: #ea3f40;
    width: 100%;
    text-align: right;
    display: block;
    line-height: 40px;
  }
  .small_chunk{
    background: #ffffff;
    padding: 10px;
    margin-bottom: 20px;
  }
</style>
