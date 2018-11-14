<template>

  <div  class="lay-blog">
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
            <li class="layui-nav-item layui-this"><a href="javascript:;" @click="goMessage()">留言</a></li>
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
    </div>

    <div class="container-wrap">
      <div class="container container-message content-width">
        <div class="contar-wrap" id="contar-wrap">
          <form class="layui-form" action="">
            <div class="layui-form-item layui-form-text input_bg">
              <input placeholder="请留下昵称" class="msg_input" v-model="message.author"/><font color="red">*</font>
              <textarea  placeholder="请留下想说的话"  class="layui-textarea" id="LAY-msg-content" style="resize:none" v-model="message.content"></textarea>
              <div class="item-btn">
                <button class="layui-btn layui-btn-normal" id="item-btn" @click="saveMessage()">提交</button>
              </div>
            </div>
          </form>

          <div id="LAY-msg-box" class="msg_content">
            <fieldset class="layui-elem-field layui-field-title liu_yan">
              <legend>留言区</legend>
            </fieldset>
            <div class="info-box msg_box">
              <div class="info-item msg_box_one" v-for="(item ,i) in itemList" :key="i">
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

          <div id="test1" class="paging"></div>
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
  name: 'leave-message',
  data: function () {
    return {
      itemList: [],
      message: {'author': '', 'content': '', 'type': '1'}
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
    },
    saveMessage () {
      console.info(this)
      let _this = this
      if (!_this.message.content) {
        layer.msg('请写一个您的昵称，随便都行')
        return
      }
      if (!_this.message.content) {
        layer.msg('请留下想说的话')
        return
      }
      _this.$http.post('/saveComments.do', _this.message
      ).then(result => {
        console.info(typeof result)
        if (result === '1') {
          layer.msg('谢谢留言', {time: 1000}, function () {
            _this.$http.post('/queryComments.do', {type: 1}
            ).then(result => {
              console.info(result)
              _this.itemList = result
            })
          })
        }
      })
    }
  },
  created: function () {
    this.$http.post('/queryComments.do', {type: 1}
    ).then(result => {
      console.info(result)
      this.itemList = result
    })
  }
}
</script>

<style scoped>
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
  .content-width{
    width: 750px;
  }
  .input_bg{
    background: #ffffff;
  }
  .input_bg input{
    margin-left: 15px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .input_bg textarea{
    width: 720px;
    margin: 0 auto;
  }
  .input_bg .item-btn button{
    margin-right: 15px;
    margin-bottom: 20px;
  }
  .msg_content{
    background: #ffffff;
    width: 750px;
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
    line-height: 70px;
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
</style>
