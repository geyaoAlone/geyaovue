<template>
  <!--
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo" @click="firstPage()">«返回首页</div>
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
      © geyao
    </div>
  </div>
  -->
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
      <div class="container container-message container-details">
        <div class="contar-wrap">
          <div class="item">
            <div class="item-box ql-snow">
              <h3><a href="details.html">{{detailInfo.title}}</a></h3>
              <h5><span class="blog_type" v-bind:style="{backgroundColor:blogTheme}">{{detailInfo.blogtype}}</span>{{detailInfo.author}}&emsp;发布于：<span>{{detailInfo.time}}</span></h5>
              <p class="ql-editor" v-html="detailInfo.content"></p>
              <!--<img src="../res/static/images/item.png" alt="">
              <div class="count layui-clear">
                <span class="pull-left">阅读 <em>100000+</em></span>
                <span class="pull-right like"><i class="layui-icon layui-icon-praise"></i><em>999</em></span>
              </div>
              -->
            </div>
          </div>
          <div id="LAY-msg-box" class="msg_content">
            <button class="layui-btn layui-btn-sm layui-btn-normal" @click="writeComment(detailInfo.blogid)"><i class="layui-icon">&#xe642;</i> 写评论</button>
            <fieldset class="layui-elem-field layui-field-title liu_yan">
              <legend>评论区</legend>
            </fieldset>
            <div class="info-box msg_box">
              <div class="info-item msg_box_one" v-for="(item ,i) in comments" :key="i">
                <img class="info-img" src="http://39.108.221.60/tx_5.jpg" alt="">
                <div class="info-text msg_box_two">
                  <p class="title count">
                    <span class="name">{{item.author}}</span>
                    <!--<i class="layui-icon layui-icon-praise"></i>5.8万-->
                    <span class="_time">{{item.time}}</span>
                  </p>
                  <p class="info-intr msg_text">{{item.content}}</p>
                </div>
              </div>
            </div>
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
  name: '详情页',
  data: function () {
    return {
      detailInfo: {},
      comments: [],
      blogTheme: '#1e9fff',
      s: ''
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
    queryWebsiteUpdateInfo () {
      this.$router.push({path: 'websiteUpdateinfo'})
    },
    goMessage () {
      this.$router.push({path: 'leaveMessage'})
    },
    firstPage () {
      this.$router.push({path: 'firstPage'})
    },
    writeComment (blogid) {
      let _this = this
      var index = layer.open({
        type: 1,
        title: '',
        skin: 'layui-layer-rim',
        area: ['400px', '250px'],
        content: '<div class="msg_div"><h4>*有什么想说的写在这吧</h4>' +
        '         <input placeholder="请留下昵称" class="msg_input" id="author"/><font color="red">*</font>' +
        '         <textarea  placeholder="请留下想说的话"  class="layui-textarea" id="LAY-msg-content" style="resize:none"></textarea>' +
        '       </div>',
        btn: ['提交'],
        yes: function (index, layero) {
          _this.$options.methods.saveliuyan(_this, index, blogid)
        }
      })
    },
    saveliuyan (_this, index, blogid) {
      var params = {blogid: blogid, author: $('#author').val(), content: $('#LAY-msg-content').val(), type: 2}
      if (!params.author) {
        params.author = '匿名'
      }
      if (!params.content) {
        layer.msg('您未留下任何想说的话', {time: 1000}, function () {
          layer.closeAll()
        })
      } else {
        _this.$http.post('/saveComments.do', params
        ).then(result => {
          console.info(result)
          if (result == '1') {
            layer.msg('评论成功', {time: 1000}, function () {
              layer.closeAll()
              _this.$http.post('/queryComments.do', {blogid: blogid}
              ).then(result => {
                console.info(result)
                _this.comments = result
              })
            })
          }
        })
      }
    }

  },
  created: function () {
    this.$http.post('/findBlogsById.do', {blogid: this.$route.query.blogid}
    ).then(result => {
      console.info(result)
      this.detailInfo = result.blog
      let blogTheme = result.type.typeTheme

      if (blogTheme) {
        this.blogTheme = blogTheme
        console.info(this.blogTheme)
      }

      /*
      var content = this.detailInfo.content.replace(/\n/g, '_@').replace(/\r/g, '_#')
      content = content.replace(/_#_@/g, '<br/>')// IE7-8
      content = content.replace(/_@/g, '<br/>')// IE9、FF、chrome
      content = content.replace(/\s/g, '&nbsp;')// 空格处理
      this.detailInfo.content = content
      */
      this.comments = result.comments
    })
    this.s = Math.floor(Math.random() * 4)
  }
}
</script>

<style >
  .msg_div{
    margin: 20px;
  }
  .msg_input{
    height: 30px;
    margin-bottom: 10px;
    border-width: 1px;
    border-style: solid;
    background-color: #fff;
    border-color:#e6e6e6;
    border-radius: 2px;
    padding-left: 10px;
  }
  .msg_content{
    background: #ffffff;
    width: 750px;
  }
  .msg_content button{
    margin: 10px 15px 0px 0px;
    float: right;
  }
  .msg_box{
    width: 720px;
    margin: 0 auto;
  }
  .msg_box_one{
    margin-bottom: 10px !important;
    border-bottom: 1px solid #eeeeee;
  }
  .msg_box_one:first-child{
    margin-top: 16px;
  }
  .msg_box_one .msg_text{
    margin-bottom: 10px;
    margin-top: -14px;
  }
  .msg_box_two:last-child{
    margin-bottom: 20px;
  }
  .liu_yan{
    width: 720px;
    margin: 0 auto;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    margin-bottom: -20px;
  }
  ._time{
    float: right;
    display: block;
    line-height: 38px;
    color: #787878;
  }
  .item-box h5 .blog_type{
    margin-right: 31px;
    color: #fff;
    background-color:#1e9fff;
    padding: 1px 10px;
    font-size: 13px;
    box-shadow: 0 0 7px rgba(0,0,0,0.3);
    border-radius: 2px;
  }

</style>
