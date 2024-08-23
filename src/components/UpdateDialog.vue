<script setup>
import { ref } from 'vue'

const prop = defineProps({
  width: {
    type: [String, Number],
    default: '380'
  },
  clickBtnHandler: {
    type: Function,
    default: function () {
      return () => {}
    }
  }
})
</script>
<template>
  <!-- 设置对话框 -->
  <el-dialog :width="prop.width">
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <el-button type="primary" @click="prop.clickBtnHandler">确定</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped></style>
