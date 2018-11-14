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
          <a href="javascript:;" @click="updateWebInfo(userInfo.usename)">更新日志</a>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="logout()">退出登陆</a></li>
      </ul>
    </div>
    <div class="little_title">
      <i class="layui-icon">&#xe66e;</i>
      <span>博客修改</span>
      <button class="layui-btn layui-btn-sm save_btn" @click="modifyEdit()">
        <i class="layui-icon">&#xe6b2;</i> 确定修改
      </button>
    </div>
    <div class="layui-body">
      <div class="detail_title">
        <input type="text" v-model="detailInfo.title" class="blog_title"/>
        <div class="blog_setting">
          博客权限：<input type="radio" name="type" value="1" checked="checked" id="type1"/>&nbsp;公开&emsp;&emsp;<input type="radio" name="type" value="2" id="type2"/>&nbsp;隐私
          &emsp;&emsp;&emsp;&emsp;&emsp;
          博客分类：
          <select v-model="selected">
            <option value="">请选择</option>
            <option v-for="(item ,i) in blogtype" :key="i" :value="item.typeId">{{item.typeName}}</option>

          </select>
        </div>
      </div>
      <div class="detail_content">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
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
  name: 'edit-blog',
  data: function () {
    return {
      detailInfo: {},
      userInfo: {},
      content: null,
      editorOption: {},
      blogtype: [],
      selected: ''
    }
  },
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
    thisPage (usename) {
      this.$router.push({path: 'myBlogs', query: {usename: this.$route.query.usename}})
    },
    updateWebInfo: function (usename) {
      this.$router.push({path: 'updateWebInfo', query: {usename: usename}})
    },
    modifyEdit () {
      this.detailInfo.content = this.content
      if (!this.detailInfo.title || !this.detailInfo.content) {
        layer.msg('标题或内容不能为空')
        return
      }
      if (!this.selected) {
        layer.msg('请选择博客分类')
        return
      }
      this.detailInfo.blogtype = this.selected
      var ispublic = $("input[name='type']:checked").val() === '1'
      console.info(ispublic)
      this.detailInfo.ispublic = ispublic
      this.detailInfo.usename = this.userInfo.usename
      this.$http.post('/updateBlogs.do', this.detailInfo
      ).then(result => {
        console.info(result)
        if (!result) {
          layer.msg('请先登陆！', {time: 1000}, function () {
            _this.$router.push({path: 'firstPage'})
          })
        } else if (result.result != '1') {
          layer.msg(result.failReason)
        } else {
          layer.msg('修改成功', {time: 1000}, function () {
            this.detailInfo = result.blog
            this.userInfo = result.user
          })
        }
      })
    },
    onEditorBlur () { // 失去焦点事件
    },
    onEditorFocus () { // 获得焦点事件
    },
    onEditorChange () { // 内容改变事件
    }
  },
  created: function () {
    let _this = this
    this.$http.post('/findBlogsById.do', this.$route.query
    ).then(result => {
      console.info(result)
      if (!result) {
        layer.msg('请先登陆！', {time: 1000}, function () {
          _this.$router.push({path: 'firstPage'})
        })
      }
      this.detailInfo = result.blog
      this.content = result.blog.content
      this.userInfo = result.user
      this.blogtype = result.blogtypeList
      this.selected = result.type.typeId
      if (result.blog.ispublic) {
        $('#type1').attr('checked', 'checked')
      } else {
        $('#type2').attr('checked', 'checked')
      }
    })
  }
}
</script>

<style scoped>
  .layui-logo{
    color:#fff!important;
  }
  .layui-body{
    left: 0px;
    margin: 0 auto;
    width: 900px;
    background: #f6f0e0;
    margin-top: 40px;
    border: 2px dashed #ffffff;
  }
  .detail_title{
    position: fixed;
    width: 896px;
    height: 110px;
    background: #f6f0e0;
    /*border-bottom: 2px dashed #ffffff;*/
    z-index: 1992;
  }
  .little_title{
    margin: 0 auto;
    width: 900px;
    margin-top: 10px;
    padding-left:10px;
    font-size: 18px;
  }
  .little_title button{
    margin-left: 700px;
    margin-bottom: 10px;
  }
  .blog_title{
    width: 60%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    display: block;
    margin-bottom: 10px;
    margin-top: 20px;
    border: 1px dashed #ffffff;
    font-size: 18px;
  }
  .detail_content{
    margin-top: 108px;
  }
  .detail_content textarea{
    height: 600px;
    width: 800px;
    border: 0px;
    padding: 0px 10px 10px 80px;
    background: #f6f0e0;
    /*border: 3px dashed #ffffff;*/
  }
  .blog_setting{
    margin-left: 210px;
  }
</style>
