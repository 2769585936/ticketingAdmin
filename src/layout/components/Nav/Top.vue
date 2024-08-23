<script setup>
import { Expand, Fold, FullScreen, EditPen } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/store/index'
import { toRefs } from 'vue'
import { viewportWidth996 } from '@/hooks/viewportWidth'
import { useAdminStore } from '@/store/index'
const { collapseState, toggleCollapse, toggleCollapseThrottle } = toRefs(useLayoutStore())
const { adminState, removeAdminState } = useAdminStore()
viewportWidth996(toggleCollapse.value)

// 切换全屏
const changeFullHandler = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())
</script>
<template>
  <div class="nav-top">
    <div class="nav-top-left">
      <div class="btn-collmenu" @click="toggleCollapseThrottle(!collapseState)">
        <el-icon v-if="collapseState" size="30" color="#ccc"><Expand /></el-icon>
        <el-icon v-else size="30" color="#ccc"><Fold /></el-icon>
      </div>
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }"> <span class="index-link">首页</span> </el-breadcrumb-item>
        <TransitionGroup name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in $route.matched.filter(item => item.path != '/index')" :key="item">
            <span class="span-breadcrumb">{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </TransitionGroup>
      </el-breadcrumb>
    </div>
    <ul class="nav-top-right">
      <li class="full-screen-btn" @click="changeFullHandler">
        <el-icon size="28"><FullScreen /></el-icon>
      </li>
      <li>
        <el-dropdown class="layout-size" trigger="click">
          <div class="el-dropdown-link">
            <el-tooltip content="布局大小" placement="bottom" effect="dark">
              <el-icon size="26"><EditPen /></el-icon>
            </el-tooltip>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>large</el-dropdown-item>
              <el-dropdown-item>default</el-dropdown-item>
              <el-dropdown-item>small</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li>
        <el-dropdown>
          <div class="el-dropdown-link">
            <el-avatar class="mr-3" :size="32" :src="adminState.userPicture" />
            <span>{{ adminState.name }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="removeAdminState">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .index-link {
    color: var(--text-color);
    font-weight: 400;
    cursor: pointer;
    &:hover {
      color: rgb(255, 208, 75);
    }
  }
  .span-breadcrumb {
    color: #ccc;

    cursor: text;
  }
}

.nav-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  height: 50px;
  line-height: 50px;
  background: var(--bg-color);
  .nav-top-left {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-collmenu {
      display: flex;
      height: 100%;
      padding: 0 10px;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: rgba(255, 208, 75, 0.7);
      }
    }
    .el-breadcrumb {
      line-height: inherit;
    }
  }
  .nav-top-right {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    gap: 8px;
    li {
      height: 100%;
      padding: 0 10px;
      color: var(--text-color);
      display: flex;
      align-items: center;
      & > div {
        height: 100%;
        line-height: inherit;
      }
      .el-dropdown-link {
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--text-color);
      }
    }
    .layout-size {
      color: var(--text-color);
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .full-screen-btn {
      cursor: pointer;
    }
    li:hover {
      background: var(--bg-color);
    }
  }
}
</style>
