<script setup lang="ts"></script>
<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="main" mode="out-in">
        <keep-alive :max="10">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.app-main {
  height: 100%;
  padding: 20px;
  background: #f0f2f5;
}
</style>
