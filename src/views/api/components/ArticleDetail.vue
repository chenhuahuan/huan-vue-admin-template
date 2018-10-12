<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <!--<CommentDropdown v-model="postForm.comment_disabled" />-->
        <!--<PlatformDropdown v-model="postForm.platforms" />-->
        <el-button v-loading="loading" v-if="isEdit" style="margin-left: 10px;" type="success" icon="el-icon-check" @click="submitForm">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="!isEdit" type="primary" icon="el-icon-edit" @click="edit">{{ $t('table.edit') }}</el-button>
        <!--<el-button v-else-if="isEdit" type="success" icon="el-icon-check" @click="save()" >{{ $t('table.confirm') }}</el-button>-->
        <el-button v-if="isEdit" type="warning" icon="el-icon-refresh" @click="cancel" >{{ $t('table.cancel') }}</el-button>
        <el-button v-loading="loading" v-if="isEdit" type="warning" icon="el-icon-document" @click="draftForm">{{ $t('table.draft') }}</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="confirmDelete" >{{ $t('table.delete') }}</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <!--<Warning />-->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
                {{ $t('table.name') }}
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="创建人:" class="postInfo-container-item">
                    <!--<el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable remote placeholder="搜索用户">-->
                    <!--<el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item"/>-->
                    <!--</el-select>-->
                    <el-input v-model="postForm.author" placeholder="请输入内容"/>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="80px" label="创建时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.date_modified" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                  </el-form-item>
                </el-col>

                <!--<el-col :span="6">-->
                <!--<el-form-item label-width="60px" label="评分:" class="postInfo-container-item">-->
                <!--<el-rate-->
                <!--v-model="postForm.rate"-->
                <!--:max="5"-->
                <!--:colors="['#99A9BF', '#F7BA2A', '#FF9900']"-->
                <!--:low-threshold="1"-->
                <!--:high-threshold="5"-->
                <!--style="margin-top:8px;"/>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
              <!--<el-row>-->
              <!--<el-form-item label-width="60px" label="创建人:" class="postInfo-container-item">-->
              <!--<el-input v-model="postForm.author" placeholder="请输入内容"/>-->
              <!--</el-form-item>-->
              <!--</el-row>-->
            </div>
          </el-col>
        </el-row>

        <!--<el-form-item style="margin-bottom: 40px;" label-width="60px" label="关键词:">-->
        <!--<el-input :rows="1" v-model="postForm.content_short" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>-->
        <!--<span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>-->
        <!--</el-form-item>-->

        <!--<div class="editor-container">-->
        <!--<Tinymce ref="editor" :height="400" v-model="postForm.content" />-->
        <!--</div>-->

        <!--<div style="margin-bottom: 20px;">-->
        <!--</div>-->
      </div>
    </el-form>

    <el-row >
      <el-col :span="12" >
        <el-card class="box-card" align="left">
          <div>
            <p>请修改如下yaml语法模板完成创建新用例：</p>
          </div>
          <div class="editor-container">
            <yaml-editor ref="YamlEditor" v-model="value"/>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" >
        <el-card class="box-card" align="left">
          <div>
            <p>辅助信息：依赖关系，业务等</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchTestcase, createCase } from '@/api/testcase'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import YamlEditor from '@/components/YamlEditor'

const defaultForm = {
  name: undefined,
  date_modified: new Date(),
  author: '',
  status: '',
  business: 'xx',
  case_detail: {},
  task: 'xx'
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown, YamlEditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      original_value: false,
      value: false,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      if (id) {
        this.fetchData(id)
      }
    } else {
      this.original_value = this.$refs.YamlEditor.getValue()
    }
  },
  methods: {
    fetchData(id) {
      fetchTestcase(id).then(response => {
        this.postForm = response.items
        // Just for test
        const js2yaml = require('json2yaml')
        const yamlText = js2yaml.stringify(this.postForm.case_detail)
        this.original_value = yamlText
        this.value = this.original_value
      }).catch(err => {
        console.log(err)
      })
    },
    edit() {
      this.isEdit = !this.isEdit
      console.log('editing....')
      console.log(this.$refs.YamlEditor.getJson())
      console.log(this.value)
      this.$refs.YamlEditor.YamlEditor.setOption('readOnly', false)
    },
    cancel() {
      this.isEdit = false
      this.$refs.YamlEditor.YamlEditor.setOption('readOnly', true)
      this.value = this.original_value
      console.log('xxx-BEGIN')
      console.log(this.original_value)
      console.log(this.$refs.YamlEditor.getValue())
      console.log('--xx-END')
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmDelete() {
      this.$confirm('此操作将永久删除该用例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$router.push('/api/list')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm() {
      console.log(this.postForm)
      console.log(this.original_value)
      console.log(this.$refs.YamlEditor.getJson())

      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = true
          this.postForm.date_modified = new Date()
          this.postForm.case_detail = this.$refs.YamlEditor.getJson()
          this.postForm.name = this.postForm.case_detail.name
          this.postForm.task = 'xx'
          this.loading = false

          createCase(this.postForm)
          //
          this.$notify({
            title: 'Congratulations',
            message: 'Updated successfully!',
            type: 'success',
            duration: 2000
          })
          this.original_value = this.value
          this.isEdit = false
          this.$refs.YamlEditor.YamlEditor.setOption('readOnly', true)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
