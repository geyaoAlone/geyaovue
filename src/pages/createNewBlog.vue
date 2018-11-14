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
      <span>写博客</span>
      <button class="layui-btn layui-btn-sm save_btn" @click="saveNewBlog()">
        <i class="layui-icon">&#xe6b2;</i> 确定保存
      </button>
    </div>
    <div class="layui-body">
      <div class="detail_title">
        <input type="text" v-model="detailInfo.title" id="title" placeholder="请输入标题" class="blog_title"/>
        <div class="blog_setting">
          博客权限：<input type="radio" name="type" value="1" checked="checked" id="type1"/>&nbsp;公开&emsp;&emsp;<input type="radio" name="type" value="2" id="type2"/>&nbsp;隐私
          &emsp;&emsp;&emsp;&emsp;&emsp;
          博客分类：
          <select v-model="selected"  @change="selectVal" class="blog_select_type">
            <option value="">请选择</option>
            <option v-for="(item ,i) in blogtype" :key="i" :value="item.typeId" >{{item.typeName}}</option>

          </select>
        </div>
      </div>
      <div class="detail_content">
        <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          name="img"
          :action="serverUrl"
          :data="upLoadData"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
        <el-row v-loading="quillUpdateImg">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
        </el-row>
      </div>
    </div>
    <div class="layui-footer" style="left:0px;">
      <!-- 底部固定区域 -->
      © geyao
    </div>
  </div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}], // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
  [{'direction': 'rtl'}], // text direction

  [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}], // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean'] // remove formatting button
]
export default {
  name: 'create-new-blog',
  data: function () {
    return {
      userInfo: {},
      detailInfo: {title: '', content: ''},
      content: null,
      upLoadData: {},
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      blogtype: [],
      selected: '',
      header: {token: sessionStorage.token}, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      serverUrl: 'http://10.10.10.125:9999/pictureUpload.do' // 这里写你要上传的图片服务器地址120.79.240.9
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
    saveNewBlog () {
      let _this = this
      this.detailInfo.content = this.content
      this.detailInfo.title = $('#title').val()
      this.detailInfo.usename = this.$route.query.usename
      if (!this.selected) {
        layer.msg('请选择博客分类')
        return
      }
      this.detailInfo.blogtype = this.selected
      this.detailInfo.ispublic = $("input[name='type']:checked").val() == '1'
      if (!this.detailInfo.title || !this.detailInfo.content) {
        layer.msg('参数为空！')
        return
      }
      this.$http.post('/saveBlogs.do', this.detailInfo
      ).then(result => {
        if (!result) {
          layer.msg('保存异常！')
        } else if (result.result != '1') {
          layer.msg(result.failReason)
        } else {
          layer.msg('保存成功！', {time: 1000}, function () {
            _this.$router.push({path: 'myBlogs', query: {usename: _this.$route.query.usename}})
          })
        }
      })
    },
    onEditorBlur () { // 失去焦点事件

    },
    onEditorFocus () { // 获得焦点事件

    },
    onEditorChange () { // 内容改变事件
    },
    // 富文本图片上传前
    beforeUpload () {
      layer.msg('图片上传中,请稍等...', {shade: [0.5, '#393D49'], icon: 16, time: 3600 * 1000})
    },
    uploadSuccess (res, file) {
      console.info('上传成功了！')
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      console.info(quill)
      // 如果上传成功
      if (res && res.result == '1') {
        console.info(res.imgUrl)
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.imgUrl)
        // 调整光标到最后
        quill.setSelection(length + 1)
        layer.msg('图片上传成功！', {time: 1000}, function () {
          layer.closeAll()
        })
      } else {
        layer.msg('图片上传成功！显示失败', {time: 1500}, function () {
          layer.closeAll()
        })
      }
      // loading动画消失
    },

    // 富文本图片上传失败
    uploadError () {
      // loading动画消失
      layer.msg('图片上传失败', {time: 1000}, function () {
        layer.closeAll()
      })
    },
    selectVal: function (ele) {
      let selTypeId = ele.target.value
      if (selTypeId == '') {
        $('.blog_select_type').css('background-color', '#fff').css('color', 'black')
      } else {
        var list = this.blogtype
        for (var i = 0; i < list.length; i++) {
          if (list[i].typeId == selTypeId) {
            $('.blog_select_type').css('background-color', list[i].typeTheme).css('color', '#fff')
          }
        }
      }
    }
  },
  created: function () {
    this.content = this.detailInfo.content
    this.$http.post('/initSaveBlogInfo.do', this.$route.query
    ).then(result => {
      console.info(result)
      if (!result || !result.user) {
        let _this = this
        layer.msg('请先登陆！', {time: 1000}, function () {
          _this.$router.push({path: 'firstPage'})
        })
      } else {
        this.userInfo = result.user
        this.blogtype = result.blogtypeList
        this.upLoadData.usename = result.user.usename
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
    margin-bottom: 20px;
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
  .blog_select_type{
    border:0;
  }
</style>
