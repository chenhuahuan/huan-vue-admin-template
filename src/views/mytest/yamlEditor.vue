<template>
  <div class="components-container">
    <code>YamlEditor is base on  <a href="https://github.com/codemirror/CodeMirror" target="_blank">CodeMirrorr</a> , lint base on json-lint </code>
    <div class="editor-container">
      <yaml-editor ref="yamlEditor" v-model="value"/>
    </div>
  </div>
</template>

<script>
import yamlEditor from '@/components/yamlEditor'

const jsonData = '- test:\n' +
  '    name: GetToken\n' +
  '    request:\n' +
  '        url: http://api.dinghuo123.com/oauth2/token\n' +
  '        method: GET\n' +
  '\n' +
  '        params:\n' +
  '            userName: $global_corp_user\n' +
  '            password: $global_corp_password\n' +
  '            grant_type: \'client_credentials\'\n' +
  '            client_id: \'2124571\'\n' +
  '            client_secret: \'3sfX3HJX484gXY\'\n' +
  '            scope: \'basic\'\n' +
  '    extract:\n' +
  '        - global_access_token: content.data.access_token\n' +
  '\n' +
  '\n' +
  '    idempotency: True\n' +
  '    session: True\n' +
  '\n' +
  '    setup_hooks: ["setup_hook"]\n' +
  '\n' +
  '    teardown_hooks: ["teardown_hook_resp"]\n' +
  '\n' +
  '    keydiff:\n' +
  '        diff_type:  normal # optional\n' +
  '\n' +
  '    validate:\n' +
  '        - "eq": [status_code,200]\n' +
  '        - "eq": [content.code,200]\n' +
  '        - "eq": [content.message,操作成功]\n' +
  '        - "ne": [content.data.access_token,\'\']\n' +
  '\n' +
  '        #expect field若出错,会打印出响应的header,body,status_code等属性值.....\n'

export default {
  name: 'YamlEditorDemo',
  components: { yamlEditor },
  data() {
    return {
      value: JSON.parse(jsonData)
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

