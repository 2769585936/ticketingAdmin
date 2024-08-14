<script setup lang="ts">
import SideMenuItem from './SideMenuItem.vue'
import { routes } from '@/router/index'
import { useRoute } from 'vue-router'
import { computed, ref, toRefs } from 'vue'
import { useLayoutStore } from '@/store/index'

const { collapseState } = toRefs(useLayoutStore())
</script>
<template>
  <div class="side-container">
    <el-menu :collapse="collapseState" router unique-opened class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#545c64" :default-active="$route.path" text-color="#fff">
      <SideMenuItem v-for="item in routes" :key="item.path" :item="item" :basePath="item.path"></SideMenuItem>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.side-container {
  height: 100vh;
  color: var(--text-color);
}
:deep(.el-menu.el-menu--vertical.el-menu-vertical-demo) {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  border: none;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #888;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #212121;

    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
