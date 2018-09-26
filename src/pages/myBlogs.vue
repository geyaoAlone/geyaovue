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
      <button class="layui-btn layui-btn-normal add" @click="save()">
        <i class="layui-icon">&#xe608;</i> 添加
      </button>
      <div class="content">

        <table class="layui-hide" id="timeline" lay-filter="test"></table>

        <script type="text/html" id="barDemo">
          <a class="layui-btn layui-btn-xs" lay-event="edit" onclick="delBlog()">编辑</a>
          <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
        </script>

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
      itemList: [],
      table: {}
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
              _this.$http.post('/saveBlogs.do', params
              ).then(result => {
                layer.msg(result, {time: 1000})
                location.reload([true])
              })
            }
          })
        } else {
          layer.msg('密码错误')
        }
        layer.close(index)
      })
    },
    thisPage (usename) {
      this.$router.push({path: 'myBlogs', query: {usename: usename}})
    },
    updateWebInfo: function () {
      this.$router.push({path: 'myBlogs'})
    },
    updateBlog (blogid) {
      this.$router.push({path: 'editBlogs', query: {blogid: blogid, usename: this.userInfo.usename}})
    },
    delBlog () {
      alert('开发中。。。')
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
    this.$http.post('/findAllBlogs.do', {usename: author}
    ).then(result => {
      console.info(result)
      if (!result) {
        layer.msg('请先登陆！', {time: 1000}, function () {
          _this.$router.push({path: 'firstPage'})
        })
      }
      _this.itemList = result.dataList
      _this.userInfo = result.user

      layui.use('table', function () {
        var table = layui.table
        this.table = table
        table.render({
          elem: '#timeline',
          data: result.dataList,
          cellMinWidth: 150, // 全局定义常规单元格的最小宽度，layui 2.2.1 新增
          cols: [[
            {field: 'time', width: '15%', title: '时间', sort: true},
            {field: 'title', width: '20%', title: '标题', sort: true},
            {field: 'content', width: '55%', title: '内容', sort: true},
            {width: '10%', title: '操作', sort: false, toolbar: '#barDemo'}
          ]]
        })
      })
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
console.log(this.table)
</script>

<style>
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
  #timeline{
    width: 100%;
    margin: 15px;
  }
  .add{
    float: right;
    margin: 20px 30px 10px;
  }
</style>
