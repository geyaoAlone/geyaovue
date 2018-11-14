<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo">
        <!--<img src="../../static/geyao_logoNew1.png" alt="" class="logo-img">-->
        欢迎您，{{userInfo.nickname}}</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-bg-green layui-layout-left">
        <li class="layui-nav-item layui-this">
          <a href="javascript:;" @click="thisPage(userInfo.usename)">我的博客</a>
        </li>
        <li class="layui-nav-item" v-if="userInfo.usetype =='0'">
          <a href="javascript:;" @click="updateWebInfo(userInfo.usename)">更新日志</a>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="logout()">退出登陆</a></li>
      </ul>
    </div>

    <div class="layui-body">
      <button class="layui-btn layui-btn-lg layui-btn-normal add" @click="save()">
        <i class="layui-icon">&#xe642;</i>写博客
      </button>
      <div class="content">
        <fieldset class="layui-elem-field ">
          <legend>我的博客</legend>
          <div class="layui-field-box">
            <div class="layui-container">
              <div class="layui-row">
                <div class="layui-col-xs4 layui-col-sm6 layui-col-md4 blog_chunk" v-for="(item ,i) in itemList" :key="i" v-bind:style="{borderColor:item.blogTheme}">
                  <span class="blog_type" v-bind:style="{backgroundColor:item.blogTheme}">{{item.blogtype}}</span>
                  <span v-if="!item.ispublic"><i class="layui-icon">&#xe67a;</i>私密的哦<i class="layui-icon">&#xe67a;</i></span>
                  <h3>{{item.title}}</h3>
                  <div class="blog_content ql-snow" >
                    <span v-html="item.content" class="ql-editor"></span>
                  </div>
                  <div class="comment count">
                    <a href="javascript:;" @click="editThisBlog(item.blogid)"> <i class="layui-icon">&#xe642;</i>修改</a>
                    <a href="javascript:;" @click="deleteThisBlog(item.blogid)"> <i class="layui-icon">&#xe640;</i>删除</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <!--
        <table class="layui-hide" id="timeline" lay-filter="test"></table>

        <script type="text/html" id="barDemo">
          <a class="layui-btn layui-btn-xs" lay-event="edit" onclick="delBlog()">编辑</a>
          <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
        </script>
        -->
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
  name: '我的时间',
  data () {
    return {
      userInfo: {},
      itemList: []
    }
  },
  // 这里写方法比如给元素绑定事件等等
  methods: {
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
    save: function () {
      let passwd = this.userInfo.passwd
      let usename = this.userInfo.usename
      let _this = this
      layer.prompt({
        formType: 1,
        title: '身份验证：'
        // area: ['800px', '350px'] //自定义文本域宽高
      }, function (value, index) {
        if (value === passwd) {
          _this.$router.push({path: 'createNewBlog', query: {usename: usename}})
          /*
          var saveOpen = layer.open({
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
              _this.$http.post('/saveBlogs.do', params
              ).then(result => {
                if (!result) {
                  layer.msg('保存异常！')
                } else if (result.result != '1') {
                  layer.msg(result.failReason)
                } else {
                  layer.msg('保存成功！', {time: 1000}, function () {
                    layer.close(saveOpen)
                    _this.itemList = result.dataList
                  })
                }
              })
            }
          })
          */
        } else {
          layer.msg('密码错误')
        }
        layer.close(index)
      })
    },
    thisPage (usename) {
      this.$router.push({path: 'myBlogs', query: {usename: usename}})
    },
    updateWebInfo: function (usename) {
      this.$router.push({path: 'updateWebInfo', query: {usename: usename}})
    },
    editThisBlog (blogid) {
      this.$router.push({path: 'editBlog', query: {blogid: blogid, usename: this.userInfo.usename}})
    },
    deleteThisBlog (blogid) {
      let _this = this
      layer.confirm('确定要删除这条博客吗?', {icon: 3, title: '提示'}, function (index) {
        _this.$http.post('/deleteBlog.do', {blogid: blogid, usename: _this.userInfo.usename}
        ).then(result => {
          if (result.result === '1') {
            layer.msg('删除成功！', {time: 1000}, function () {
              _this.itemList = result.blogList
            })
          } else {
            layer.msg('删除失败：' + result.failReason, {time: 1500})
          }
        })
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
    var data = []
    this.$http.post('/findAllBlogs.do', {usename: author}
    ).then(result => {
      console.info(result)
      if (!result) {
        layer.msg('请先登陆！', {time: 1000}, function () {
          _this.$router.push({path: 'firstPage'})
        })
      }
      var typeList = result.blogTypeList
      data = result.dataList

      if (data.length > 0 && typeList.length > 0) {
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < typeList.length; j++) {
            if (data[i].blogtype === typeList[j].typeName) {
              data[i].blogTheme = typeList[j].typeTheme
            }
          }
        }
      }
      _this.itemList = data
      _this.userInfo = result.user
    })
  }

}
// 监听工具条
/*
this.table.on('toolbar(test)', function (obj) {
  var data = obj.data
  console.info(data)
  switch (obj.event) {
    case 'edit':
      layer.msg('添加')
      break
    case 'del':
      layer.msg('删除')
      break
  };
})
*/
</script>

<style>
  .layui-container{
    width: 100%;
  }
  .layui-logo{
    color:#fff!important;
  }
  .layui-body{
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
  #timeline{
    width: 100%;
    margin: 15px;
  }
  .add{
    float: right;
    margin: 20px 30px 10px;
  }
  .blog_chunk{
    background: #fff;
    margin: 10px;
    width: 637px;
    height: 500px;
    border: 1px solid #419488;
    border-radius: 5px;
  }
  .blog_chunk h3{
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .blog_content{
    height: 340px;

  }
  .blog_content span{
    font-size: 14px;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 12;
    overflow: hidden;
    margin: 0px 7px 10px 7px;
    padding: 0px 20px 0px 20px;

  }
  .blog_chunk .blog_type{
    margin-right: 25px;
    padding: 2px 6px 2px 6px;
    background-color: #419488;
    color: #fff;
    border-top-left-radius:5px;
    border-bottom-right-radius: 2px;

  }
  .blog_chunk span:nth-child(2){
    color: #ea3f40;
  }
</style>
