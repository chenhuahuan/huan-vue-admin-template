<template>
  <div class="components-container">
    <code>YamlEditor is base on  <a href="https://github.com/codemirror/CodeMirror" target="_blank">CodeMirrorr</a> , lint base on json-lint </code>
    <el-row >
      <el-col :span="12" >
        <el-card class="box-card" align="left">
          <el-button-group >
            <el-button v-if="!isEditing" type="primary" icon="el-icon-edit" @click="edit()">{{ $t('table.edit') }}</el-button>
            <el-button v-else-if="isEditing" type="success" icon="el-icon-check" @click="save()" >{{ $t('table.confirm') }}</el-button>
            <el-button type="danger" icon="el-icon-delete" >Delete</el-button>
          </el-button-group>
          <br>
          <br>
          <div class="editor-container">
            <yaml-editor ref="YamlEditor" v-model="value"/>
          </div>
        </el-card>
      </el-col>
    </el-row>

</div></template>

<script>
import YamlEditor from '@/components/YamlEditor'

export default {
  name: 'YamlEditorDemo',
  components: { YamlEditor },
  data() {
    return {
      value: false,
      isEditing: true
    }
  },
  methods: {
    edit() {
      this.isEditing = !this.isEditing
      console.log('editing....')
      console.log(this.$refs.YamlEditor.getJson())
      console.log(this.value)
    },
    save() {
      this.isEditing = !this.isEditing
      console.log('saving....')
      console.log(this.$refs.YamlEditor.getJson())
      console.log(this.value)
    }
  }
}
</script>

<style scoped>
.editor-container{
  position: relative;
  height: 50%;
}
</style>

