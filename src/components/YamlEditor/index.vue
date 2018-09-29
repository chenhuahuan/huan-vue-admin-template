<template>
  <div class="yaml-editor">
    <!--<textarea ref="textarea"/>-->
    <textarea id="code" ref="textarea" name="code" >
      --- # Favorite movies
      - Casablanca
      - North by Northwest
      - The Man Who Wasn't There
      --- # Shopping list
      [milk, pumpkin pie, eggs, juice]
      --- # Indented Blocks, common in YAML data files, use indentation and new lines to separate the key: value pairs
      name: John Smith
      age: 33
      --- # Inline Blocks, common in YAML data streams, use commas to separate the key: value pairs between braces
      {name: John Smith, age: 33}
      ---
      receipt:     Oz-Ware Purchase Invoice
      date:        2007-08-06
      customer:
      given:   Dorothy
      family:  Gale

      items:
      - part_no:   A4786
      descrip:   Water Bucket (Filled)
      price:     1.47
      quantity:  4

      - part_no:   E1628
      descrip:   High Heeled "Ruby" Slippers
      size:       8
      price:     100.27
      quantity:  1

      bill-to:  &id001
      street: |
      123 Tornado Alley
      Suite 16
      city:   East Centerville
      state:  KS

      ship-to:  *id001

      specialDelivery:  >
      Follow the Yellow Brick
      Road to the Emerald City.
      Pay no attention to the
      man behind the curtain.
      ...
    </textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!js-yaml')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/yaml-lint'
import 'codemirror/mode/yaml/yaml.js'

export default {
  name: 'YamlEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value'],
  data() {
    return {
      YamlEditor: CodeMirror.fromTextArea(document.getElementById('code'), {})
    }
  },
  watch: {
    value(value) {
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
