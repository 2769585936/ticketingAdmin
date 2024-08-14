import { defineStore } from 'pinia'
import { ref } from 'vue'
import { throttle } from '@/utils'
export const useLayoutStore = defineStore('layout', () => {
  // 菜单伸缩
  const collapseState = ref<boolean>(false)
  const toggleCollapse = (b?: boolean) => {
    if (b != null) {
      collapseState.value = b
    } else {
      collapseState.value = !collapseState.value
    }
  }
  const toggleCollapseThrottle = throttle(toggleCollapse, 300)

  // 缓存tag
  const tagList = ref([
    {
      path: '/index',
      title: '首页'
    }
  ])

  const addTag = tag => {
    // 实现添加tag的功能
    // 判断是否在tagList 存在
    const b = tagList.value.every(item => item.title != tag.title)
    b && tagList.value.push(tag)
  }

  const deleteTag = tag => {
    // 实现删除tag的功能
    tagList.value = tagList.value.filter(item => item.title == tag.title)
  }

  return {
    collapseState,
    toggleCollapse,
    toggleCollapseThrottle,
    tagList,
    addTag,
    deleteTag
  }
})
