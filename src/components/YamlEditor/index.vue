<template>
  <div class="yaml-editor">
    <textarea id="code" ref="textarea" name="code" >
    - test:
        name: xxx
        dependent: xxx
        request:
          url: xxx
          method: GET

          params:
            param1: xxx
            param2: xxx
            param3: xxx
            param4: xxx

        setup_hooks: []
        teardown_hooks: []

        keydiff:
          diff_type: normal
        validate:
        - "eq": [status_code,200]
        - "eq": [content.code,200]
        - "eq": [content.message,操作成功]
      </textarea>

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

/* eslint-disable */
export default {
  name: 'YamlEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value'],
  data() {
    return {
      YamlEditor: false
    }
  },
  watch: {
    value(value) {
      const editor_value = this.YamlEditor.getValue()
      if (value !== editor_value) {
        this.YamlEditor.setValue(this.value, null, 2)
      }
    }
  },
  mounted() {
    this.YamlEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
      lineNumbers: true,
      mode: 'yaml',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true,
      indentUnit: 4,         // 缩进单位为4
    })

    this.YamlEditor.setOption("extraKeys", {
      // Tab键换成4个空格
      Tab: function(cm) {
        var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
      }
    });

    this.YamlEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.YamlEditor.getValue()
    },
    getJson() {
       let yaml_json = jsyaml.safeLoad(this.YamlEditor.getValue())
       return yaml_json

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
