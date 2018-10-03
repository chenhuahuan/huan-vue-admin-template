<template>
  <div class="components-container">
    <code>YamlEditor is base on  <a href="https://github.com/codemirror/CodeMirror" target="_blank">CodeMirrorr</a> , lint base on json-lint </code>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div class="editor-container">
            <yaml-editor ref="YamlEditor" v-model="value"/>
          </div>
        </el-card>
      </el-col>
      <!--<el-col :span="12">-->
      <!--<el-card class="box-card">-->
      <!--<div class="editor-container">-->
      <!--<yaml-editor ref="YamlEditor" v-model="value"/>-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <el-card class="box-card">
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn blue-btn" to="/documentation/index">Documentation</router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn light-blue-btn" to="/icon/index">Icons</router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn pink-btn" to="/excel/export-excel">Excel</router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn green-btn" to="/table/complex-table">Table</router-link>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <el-row>
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

      </textarea>
    </el-row>
</div></template>

<script>
import jsyaml from 'js-yaml'
import YamlEditor from '@/components/YamlEditor'

const yamlData = '        --- # Favorite movies\n'
// var aaa = 5
// import 'codemirror/addon/lint/yaml-lint'

export default {
  name: 'YamlEditorDemo',
  components: { YamlEditor },
  data() {
    var aa = jsyaml.load(yamlData)
    console.log(aa)
    console.log(window.aaa)
    return {
      value: jsyaml.load(yamlData)
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

