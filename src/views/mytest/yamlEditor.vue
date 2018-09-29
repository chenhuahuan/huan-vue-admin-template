<template>
  <div class="components-container">
    <code>YamlEditor is base on  <a href="https://github.com/codemirror/CodeMirror" target="_blank">CodeMirrorr</a> , lint base on json-lint </code>
    <div class="editor-container">
      <yaml-editor ref="YamlEditor" v-model="value"/>
    </div>
  </div>
</template>

<script>
import YamlEditor from '@/components/YamlEditor'

// const jsonData = 'test:123'

export default {
  name: 'YamlEditorDemo',
  components: { YamlEditor },
  data() {
    return {
      value: YamlEditor.value
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

