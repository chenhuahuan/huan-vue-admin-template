<template>
  <div class="yaml-editor">
    <textarea ref="textarea"/>
  </div>

</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!js-yaml/dist/js-yaml.min')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/yaml-lint'
import 'codemirror/mode/yaml/yaml.js'

export default {
  name: 'YamlEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value'],
  data() {
    // const aa = { a: CodeMirror.fromTextArea(document.getElementById('code'), {}) }
    // alert(JSON.stringify(aa.a))
    return {
      YamlEditor: false
    }
  },
  watch: {
    value(value) {
      // alert(value)
      const editor_value = this.YamlEditor.getValue()
      if (value !== editor_value) {
        this.YamlEditor.setValue(JSON.stringify(this.value, null, 2))
      }
    }
  },
  mounted() {
    this.YamlEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'yaml',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })

    this.YamlEditor.setValue(JSON.stringify(this.value, null, 2))
    this.YamlEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.YamlEditor.getValue()
    }
  }
}
</script>

<style scoped>
.yaml-editor{
  height: 100%;
  position: relative;
}
.yaml-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.yaml-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.yaml-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
