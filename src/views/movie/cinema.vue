<script setup lang="ts">
import { getCinemaApi } from '@/api/cinema'
import { onBeforeMount, ref } from 'vue'

//#region 获取影院数据
const cinemaList = ref([])
const getCinemaList = async (params = null) => {
  const res = await getCinemaApi(params)
  cinemaList.value = res.data
  console.log(res.data)
}

onBeforeMount(() => getCinemaList())
//#endregion
</script>
<template>
  <div class="cinema-main">
    <!-- 影院列表 -->
    <my-table class="table-main" :data="cinemaList">
      <el-table-column align="center" type="index" width="120" label="索引"></el-table-column>
      <el-table-column align="center" prop="_id" label="id"></el-table-column>
      <el-table-column align="center" prop="cinemaName" label="名称"></el-table-column>
      <el-table-column align="center" prop="address" label="地址"></el-table-column>
      <el-table-column align="center" prop="pictureUrl" label="头像"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button type="primary">设置</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<style scoped lang="scss">
.cinema-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .table-main {
    flex: 1;
  }
}
</style>
