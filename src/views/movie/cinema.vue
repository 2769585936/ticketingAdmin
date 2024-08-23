<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

import { getCinemaApi, updateCinemaApi, deleteCinemaApi, addCinameApi } from '@/api/cinema'
import { onBeforeMount, ref } from 'vue'
import { ElMessage } from 'element-plus'

//#region 获取影院数据
const cinemaList = ref([])
const formObj = ref({
  cinemaName: ''
})

const tableLoading = ref(false)

// 根据名称/ID 查找
const cinemaFind = () => {
  // 假设 cinemaName 为空时
  if (formObj.value.cinemaName.trim().length == 0) {
    return getCinemaList()
  }
  getCinemaList({ cinemaName: formObj.value.cinemaName })
}

const getCinemaList = async (params = null) => {
  tableLoading.value = true
  const res = await getCinemaApi(params).catch(() => {})
  if (res) cinemaList.value = res.data
  tableLoading.value = false
}
onBeforeMount(() => getCinemaList())
//#endregion

//#region 添加影院数据

const addFormRef = ref(null)
const addFormObj = ref({})
const addRules = ref({
  cinemaName: [{ required: true, message: '影院名称不能为空', trigger: 'blur' }],
  address: [{ required: true, message: '影院地址不能为空', trigger: 'blur' }]
})

// 弹窗
const addDialogState = ref(false)
const addDialogShowHandler = () => {
  addFormObj.value = {}
  addDialogState.value = true
}
const addDialogHideHandler = () => {
  addDialogState.value = false
}

// add确定事件
const addCinema = async () => {
  const v = await addFormRef.value.validate().catch(() => false)
  if (!v) return
  const reqObj = addFormObj.value
  const data = await addCinameApi(reqObj)
  getCinemaList()
  addDialogHideHandler()
}

//#endion

//#region 更新影院信息
// dialog弹框
const dialogState = ref(false)
// dialog数据
const dialogData = ref({})
// 表单组件实例
const formRef = ref(null)
const rules = ref({
  cinemaName: [{ required: true, message: '影院名称不能为空', trigger: 'blur' }],
  address: [{ required: true, message: '影院地址不能为空', trigger: 'blur' }]
})

const dialogShowHandler = row => {
  dialogState.value = true
  dialogData.value = { ...row, lable: row.cinemaName }
}

const dialogCloseHandler = () => {
  dialogState.value = false
}

// 确定按钮事件
const updateCinema = async () => {
  const v = await formRef.value.validate().catch(() => false)
  if (!v) return
  const reqObj = dialogData.value
  const data = await updateCinemaApi(reqObj)
  getCinemaList()
  dialogCloseHandler()
}

const deleteCiname = async row => {
  const { _id } = row

  await deleteCinemaApi({ _id })
  await getCinemaList()
}

//#endregion
</script>
<template>
  <div class="cinema-main">
    <!--  -->
    <el-form :model="formObj" @submit.prevent class="demo-form-inline" size="default">
      <el-input v-model.trim="formObj.cinemaName" placeholder="请输入名称/ID" :prefix-icon="Search" />
      <el-button type="primary" :icon="Search" @click="cinemaFind">查询</el-button>
      <el-button class="add-button" type="primary" @click="addDialogShowHandler">添加</el-button>
    </el-form>
    <!-- 影院列表 -->
    <my-table v-loading="tableLoading" class="table-main" :data="cinemaList">
      <el-table-column align="center" type="index" width="120" label="索引"></el-table-column>
      <el-table-column align="center" prop="_id" label="id"></el-table-column>
      <el-table-column align="center" prop="cinemaName" label="名称"></el-table-column>
      <el-table-column align="center" prop="address" label="地址"></el-table-column>
      <el-table-column align="center" prop="pictureUrl" label="头像"></el-table-column>
      <el-table-column align="center" label="操作" width="170">
        <template #default="{ row }">
          <el-button type="primary" @click="dialogShowHandler(row)">编辑</el-button>
          <el-popconfirm @confirm="deleteCiname(row)" confirm-button-text="确定" cancel-button-text="取消" title="确定删除?">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </my-table>

    <!-- 编辑影院弹窗 -->
    <update-dialog v-if="dialogState" v-model="dialogState" :title="'名称:' + dialogData.lable" :clickBtnHandler="updateCinema">
      <!-- 请根据需要自行编写 -->
      <el-form ref="formRef" :rules="rules" :model="dialogData" label-width="70">
        <el-form-item prop="cinemaName" label="名称">
          <el-input v-model.trim="dialogData.cinemaName" />
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model.trim="dialogData.address" />
        </el-form-item>
      </el-form>
    </update-dialog>
    <!-- 添加影院弹窗 -->
    <update-dialog v-if="addDialogState" v-model="addDialogState" title="添加影院数据" :clickBtnHandler="addCinema">
      <!-- 请根据需要自行编写 -->
      <el-form ref="addFormRef" :rules="addRules" :model="addFormObj" label-width="70">
        <el-form-item prop="cinemaName" label="名称">
          <el-input v-model.trim="addFormObj.cinemaName" />
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model.trim="addFormObj.address" />
        </el-form-item>
      </el-form>
    </update-dialog>
  </div>
</template>

<style scoped lang="scss">
.cinema-main {
  height: 100%;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  .demo-form-inline {
    display: flex;
    width: 360px;
    gap: 20px;
    .add-button {
      margin-left: 0;
    }
  }
  .table-main {
    flex: 1;
  }
}
</style>
