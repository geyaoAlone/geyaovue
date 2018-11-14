
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
          <li class="layui-nav-item layui-this"><a href="javascript:;" @click="firstPage()">首页</a></li>
          <li class="layui-nav-item"><a href="javascript:;" @click="goMessage()">留言</a></li>
          <li class="layui-nav-item"><a href="javascript:;" @click="queryWebsiteUpdateInfo()">关于小站</a></li>
        </ul>
        <a href="javascript:;" class="personal pull-left" @click="login()" id="login">
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
          <p><i class="layui-icon layui-icon-speaker"></i>公告：<span>欢迎来到葛耀的小站</span></p>
        </h4>
        <div class="item" v-for="(item ,i) in itemList" :key="i">
          <div class="item-box ql-snow">
            <h3><a href="javascript:;" @click="articleDetail(item.blogid)">{{item.title}}</a></h3>
            <h5>
              <span class="blog_type" v-for="type in typeList" v-if="type.typeName == item.blogtype" v-bind:style="{backgroundColor:type.typeTheme}">
                {{item.blogtype}}
              </span>
              {{item.author}}&emsp;发布于：<span>{{item.time}}</span>
            </h5>
            <div class="timeline_content ql-editor" v-html="item.content">

            </div>
            <!--<img src="../res/static/images/item.png" alt="">-->
            <a style="float:right;color: #ea3f40;margin-right:15px;" @click="articleDetail(item.blogid)">阅读全文➠</a>
          </div>
          <!--
          <div class="comment count">
            <a href="javascript:;" @click="articleDetail(item.blogid)">评论</a>
            <a href="javascript:;" class="like" blogid="item.blogid">点赞</a>
          </div>
          -->
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
  name: '我的首页',
  data: function () {
    return {
      itemList: [],
      typeList:[]
    }
  },
  // 这里写方法比如给元素绑定事件等等
  methods: {
    login: function () {
      let _this = this
      var index = layer.open({
        type: 1,
        title: '',
        skin: 'layui-layer-rim',
        area: ['350px', '300px'],
        content: '<div class="login layui-form">' +
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
    articleDetail (blogid) {
      this.$router.push({path: 'articleDetail', query: {blogid: blogid}})
    },
    queryWebsiteUpdateInfo () {
      this.$router.push({path: 'websiteUpdateinfo'})
    },
    goMessage () {
      this.$router.push({path: 'leaveMessage'})
    }
  },
  created: function () {
    var data = []
    this.$http.post('/findAllBlogs.do', {}
    ).then(result => {
      console.info(result)
      data = result.dataList
      this.typeList = result.blogTypeList

      /*
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var temp = data[i].content.replace(/\n/g, '_@').replace(/\r/g, '_#')
          temp = temp.replace(/_#_@/g, '<br/>')// IE7-8
          temp = temp.replace(/_@/g, '<br/>')// IE9、FF、chrome
          temp = temp.replace(/\s/g, '&nbsp;')// 空格处理
          console.info(temp)
          data[i].content = temp
        }
      }
      */
      this.itemList = data
    })

    layui.config({
      base: '../../static/'
    }).use('blog')
  }
}

</script>
<style>
  .timeline_content{
    font-size: 15px;
    color: #000000;
    /*display: -webkit-box;*/
    /* autoprefixer: off */
    /*-webkit-box-orient: vertical;*/
    /* autoprefixer: on */
    /*-webkit-line-clamp: 8;*/
    /*overflow: hidden;*/
    /*display: block;*/
    /* -webkit-margin-before: 1em;*/
    /* -webkit-margin-after: 1em;*/
    /* -webkit-margin-start: 0px;*/
    /*-webkit-margin-end: 0px;*/
    max-height: 400px;
    padding-top: 0px;
  }
  .logo-img{
    display: block;
    margin-top: 8px;
  }
  .layui-icon-username{
    display: block;
  }
  .login_layer{
    margin-top: 30px;
  }
  .login_img{
    margin-top: 30px;
    width: 240px;
    margin-left: 52px;
  }
  .item-box h5 .blog_type{
    margin-right: 31px;
    color: #fff;
    background-color:#1e9fff;
    padding: 1px 10px;
    font-size: 13px;
    /*box-shadow: 0 0 7px rgba(0,0,0,0.3);*/
    border-radius: 2px;
  }
</style>
