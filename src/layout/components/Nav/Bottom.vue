<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const tagList = ref([
  {
    path: '/index',
    title: '首页',
    fullPath: '/index'
  }
])
const deleteItem = tag => {
  tagList.value = tagList.value.filter(item => item != tag)
}

const addItem = tag => {
  const b = tagList.value.every(item => item.title != tag.title)
  b && tagList.value.push(tag)
}
const route = useRoute()
watch(
  route,
  v => {
    if (v.path !== '/' && v.fullPath !== '/index' && v.meta.cache) {
      addItem({
        path: v.fullPath,
        title: v.meta.title,
        fullPath: v.fullPath
      })
    }
  },
  { immediate: true }
)
</script>
<template>
  <div class="nav-bottom">
    <el-scrollbar class="scroll-container">
      <router-link class="tag-item" active-class="active" v-for="item in tagList" :key="item" :to="{ path: item.path, fullPath: item.fullPath }">
        {{ item.title }}
        <span v-if="item.title != '首页'" class="close-tag" @click="deleteItem(item)">x</span>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.nav-bottom {
  width: 100%;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  height: 36px;
  padding: 0px 8px;
  display: flex;
  overflow: auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.tag-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 24px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 10px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    margin-right: 15px;
  }
  &.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;

    .close-tag {
      color: #fff;
    }
    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 3px;
    }
  }
  .close-tag {
    display: inline-block;
    width: 15px;
    height: 15px;
    position: relative;
    top: -5px;
    right: -10px;
    line-height: 14px;
    font-size: 12px;
    color: #495060;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.2);
      color: #ffd04b;
    }
  }
}
</style>
