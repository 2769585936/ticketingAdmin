<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const options = [
  { value: '1', label: '全部' },
  { value: '2', label: '正常' },
  { value: '3', label: '其他' }
]

const formObj = ref({
  phone: '',
  userType: '1'
})
const userList = ref([
  {
    name: '1',
    uid: '546',
    phone: '5464',
    state: '1',
    email: ''
  }
])
</script>
<template>
  <div class="user-main">
    <el-form :model="formObj" class="demo-form-inline" size="default">
      <el-input v-model="formObj.phone" placeholder="请输入手机号/用户ID" :prefix-icon="Search" />
      <el-select v-model="formObj.userType" class="select-width" placeholder="Activity zone">
        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
      <el-button type="primary">查询</el-button>
    </el-form>
    <!-- Your page content here -->
    <el-table class="table-main" :data="[]" style="width: 100%" border header-cell-class-name="table-header-style">
      <el-table-column type="index" align="center" label="索引" width="60" />
      <el-table-column prop="uid" align="center" label="UID" width="180" />
      <el-table-column prop="phone" align="center" label="手机号" width="180" />
      <el-table-column prop="email" align="center" label="邮箱" />
      <el-table-column prop="name" align="center" label="姓名" />
      <el-table-column prop="state" align="center" label="状态" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="small" type="primary">编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">
.user-main {
  padding: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .table-main {
    flex: 1;
  }
}
</style>
<style scoped lang="scss">
.demo-form-inline {
  display: flex;
  width: 400px;

  .select-width {
    width: 110px;
    flex-shrink: 0;
    margin: 0 16px;
  }
}

:deep(.table-header-style) {
  background: #f8f8f9 !important;
}
</style>
