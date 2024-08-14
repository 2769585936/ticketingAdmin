<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import { getUserApi, updateUserApi } from '@/api/user'
import { ElLoading } from 'element-plus'
const options = [
  { value: '0', label: '全部' },
  { value: '1', label: '正常' },
  { value: '2', label: '其他' }
]

const formObj = ref({
  phone: '',
  userState: '0'
})

//#region 获取用户数据
const loading = ref(false)
const userList = ref([])

const getUserList = async (data = undefined) => {
  loading.value = true
  const res = await getUserApi(data)
  if (res) {
    userList.value = res.data
  }
  loading.value = false
}

const userFind = () => {
  if (formObj.value.phone.trim().length == 0 && formObj.value.userState == '0') {
    return getUserList()
  }
  getUserList({
    phone: formObj.value.phone ? formObj.value.phone : undefined,
    userState: formObj.value.userState
  })
}

//#endregion
onBeforeMount(() => getUserList())

//#region  头像显示
const perviewShow = ref(false)
const perviewList = ref([])
const perviewShowHandler = src => {
  perviewShow.value = true
  perviewList.value = [src]
}
const perviewHideHandler = () => {
  perviewList.value = []
  perviewShow.value = false
}
//#endregion

//#region 用户弹出表单
const userDialogSetting = ref(false)

// dialog 用户数据
const userDialogValue = ref({})
const ruleFormRef = ref(null)
const userListRules = ref({
  name: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  },
  phone: {
    required: true,
    message: '请输入手机号',
    trigger: 'blur'
  }
})
// 关闭
const closeDialogHandler = () => {
  userDialogSetting.value = false
}

// 打开
const openDialogHandler = value => {
  userDialogSetting.value = true
  userDialogValue.value = {
    ...value,
    label: value.name
  }
}

//确定 修改user
const updateUser = async formEl => {
  const validata = await formEl.validate().catch(err => false)
  if (!validata) return
  await updateUserApi(userDialogValue.value)
  closeDialogHandler()
  // 关闭弹窗
  await getUserList()
}

//#endregion

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
  <div class="user-main">
    <el-form :model="formObj" class="demo-form-inline" size="default">
      <el-input v-model="formObj.phone" placeholder="请输入手机号/用户ID" :prefix-icon="Search" />
      <el-select v-model="formObj.userState" class="select-width" placeholder="Activity zone">
        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
      <el-button type="primary" :icon="Search" @click="userFind">查询</el-button>
    </el-form>
    <el-table v-loading="loading" class="table-main" header-row-class-name="table-cell-tr" :data="userList" style="width: 100%" border header-cell-class-name="table-header-style">
      <el-table-column type="index" align="center" label="索引" width="60" />
      <el-table-column prop="_id" align="center" label="UID" width="180" />
      <el-table-column prop="phone" align="center" label="手机号" width="180" />
      <el-table-column prop="email" align="center" label="邮箱" />
      <el-table-column prop="name" align="center" label="姓名" />
      <el-table-column align="center" label="头像" width="80">
        <template #default="{ row }">
          <img @click="perviewShowHandler(row.userPicture)" class="user-picture-mini" :src="row.userPicture" :alt="row.name" style="width: 60px; height: 60px; border-radius: 50%" />
        </template>
      </el-table-column>
      <el-table-column prop="state" align="center" label="状态">
        <template #default="{ row }">
          <span class="state-tag" :class="'state-tag' + stateHandler(row.state).value">{{ stateHandler(row.state).label }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="openDialogHandler(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 头像预览 -->
    <el-image-viewer v-if="perviewShow" @close="perviewHideHandler" hide-on-click-modal close-on-press-escape :url-list="perviewList" :url="perviewList[0]" teleported />

    <!-- 设置对话框 -->
    <el-dialog v-if="userDialogSetting" v-model="userDialogSetting" :title="userDialogValue.label" width="380">
      <el-form ref="ruleFormRef" :model="userDialogValue" :rules="userListRules" label-width="70">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userDialogValue.phone" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userDialogValue.name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="userDialogValue.state" placeholder="请选择状态">
            <el-option v-for="item in states" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
      </el-form>
      <!--... -->
      <template #footer>
        <el-button type="primary" @click="updateUser(ruleFormRef)">确定</el-button>
      </template>
    </el-dialog>
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

:deep(.table-cell-tr) {
  word-break: break-word;
  background-color: #f8f8f9;
  color: #515a6e;
  height: 40px;
  font-size: 13px;
}
:deep(.table-header-style) {
  background: #f8f8f9 !important;
}
</style>
