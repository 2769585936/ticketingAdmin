import { onBeforeUnmount, onMounted } from 'vue'

export const viewportWidth996 = (fn?: Function) => {
  function __fn() {
    const width = window.innerWidth
    if (width >= 996) {
    } else {
      fn && fn(true)
    }
  }

  onMounted(() => {
    window.addEventListener('resize', __fn)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', __fn)
  })
}
