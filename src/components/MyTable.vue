<script setup></script>
<template>
  <el-table header-row-class-name="table-cell-tr" style="width: 100%" border header-cell-class-name="table-header-style">
    <slot></slot>
    <template #empty>
      <slot name="empty">
        <el-empty description="没有更多数据"> </el-empty>
      </slot>
    </template>
  </el-table>
</template>

<style scoped></style>
