<script setup lang="ts">
import Side from './components/Side/index.vue'
import Nav from './components/Nav/index.vue'
import Main from './components/Main/index.vue'
</script>
<template>
  <div class="layout-container">
    <div class="layout-side hidden-sm-and-down">
      <Side />
    </div>
    <div class="layout-right">
      <div class="layout-nav">
        <Nav />
      </div>
      <div class="layout-main">
        <Main />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;

  .layout-side {
    width: fit-content;
    background: var(--bg-color);
    height: 100vh;
  }
  .layout-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  .layout-main {
    flex: 1;
  }
}
</style>
