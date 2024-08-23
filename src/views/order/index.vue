<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import { getOrdersApi } from '@/api/order'
import { ElLoading } from 'element-plus'

const formObj = ref({
  id: '',
  state: '0'
})
const options = ref([
  {
    value: '0',
    label: '全部'
  },
  {
    value: '1',
    label: '已支付'
  },
  {
    value: '2',
    label: '待支付'
  }
])

//#region 获取订单数据
const loading = ref(false)
const orderList = ref([])
const getOrderList = async (data = undefined) => {
  try {
    loading.value = true
    const res = await getOrdersApi(data)
    if (res) {
      orderList.value = res.data
      console.log(res.data)
    }
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

const orderFind = () => {
  if (formObj.value.id.trim().length == 0 && formObj.value.state == '0') {
    return getOrderList()
  }
  getOrderList({
    id: formObj.value.id ? formObj.value.id : undefined,
    state: formObj.value.state
  })
}

//#endregion
onBeforeMount(() => getOrderList())

//#region  状态栏
const states = [
  {
    value: '1',
    label: '正常'
  },
  {
    value: '2',
    label: '锁定'
  }
]

const stateHandler = value => {
  return states.find(item => item.value == value)
}
//#endregion
</script>
<template>
  <div class="order-main">
    <el-form :model="formObj" class="demo-form-inline" size="default">
      <el-input v-model.trim="formObj.id" placeholder="请输入订单/用户ID" :prefix-icon="Search" />
      <el-select v-model="formObj.state" class="select-width">
        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
      <el-button type="primary" :icon="Search" @click="orderFind">查询</el-button>
    </el-form>
    <my-table v-loading="loading" class="table-main" :data="orderList">
      <el-table-column type="index" align="center" label="索引" width="60" />
      <el-table-column prop="_id" align="center" label="ID" width="180" />
      <el-table-column prop="_userid" align="center" label="UID" width="180" />
      <el-table-column prop="totalcost" align="center" label="总价" />
      <el-table-column prop="orderStartTime" align="center" label="订单开始时间" />
      <el-table-column prop="currentOrderState" align="center" label="订单状态">
        <template #default="{ row }">
          <el-tag v-if="row.currentOrderState == '1'" type="success"> {{ row.currentOrderState == '1' ? '已支付' : '待支付' }}</el-tag>
          <el-tag v-if="row.currentOrderState == '2'" type="danger"> {{ row.currentOrderState == '1' ? '已支付' : '待支付' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="160">
        <template #default="{ row }">
          <el-button type="primary" @click="openDialogHandler(row)">详情</el-button>
          <el-button type="danger" @click="openDialogHandler(row)">删除</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>
<style scoped lang="scss">
.order-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .table-main {
    flex: 1;
    .user-picture-mini {
      cursor: pointer;
    }
    .state-tag {
      display: inline-block;
      border: 1px solid #ccc;
      padding: 0px 8px;
      font-size: 12px;
      background: red;

      &.state-tag1 {
        color: #409eff;
        background: #f0f2f5;
      }
      &.state-tag2 {
        color: #f56c6c;
        background: #fff0f0;
      }
    }
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
</style>
