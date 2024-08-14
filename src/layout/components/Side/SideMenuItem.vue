<script setup lang="ts">
const prop = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const pathResolver = path => {
  return prop.basePath + '\/' + path
}
</script>
<template>
  <template v-if="!item.hidden">
    <!-- 判断是否有子级 -->
    <!-- 有子级 -->
    <template v-if="item.children && item.children.length">
      <el-sub-menu :index="prop.basePath">
        <template #title>
          <el-icon class="iconfont" :class="item.meta.icon"></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归子项 -->
        <side-menu-item v-for="subItem in item.children" :key="subItem.path" :base-path="pathResolver(subItem.path)" :item="subItem" />
      </el-sub-menu>
    </template>
    <!-- 没有 -->
    <template v-else>
      <el-menu-item :index="prop.basePath">
        <template #title>
          <el-icon class="iconfont" :class="item.meta.icon"></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped>
.iconfont {
  font-size: 20px;
}
</style>
