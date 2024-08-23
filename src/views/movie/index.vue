<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getMovieApi, updateMovieRecommendApi } from '@/api/movie'
import { getTagsApi } from '@/api/other'
import { Search } from '@element-plus/icons-vue'

const tags = ref([])
const getTags = async () => {
  const res = await getTagsApi()
  tags.value = res.data
}
onBeforeMount(() => getTags())

//#region 查找影片
const movieFormRef = ref(null)
const movieFormObj = ref({
  filmTitle: ''
})

const movieFind = async () => {
  if (movieFormObj.value.filmTitle.length) {
    return getMovieList({
      filmTitle: movieFormObj.value.filmTitle
    })
  }
  getMovieList()
}
// 影片列表
const movieList = ref([])
const movieLoading = ref(false)

const getMovieList = async (params = null) => {
  movieLoading.value = true
  const res = await getMovieApi(params).catch(() => {})
  if (res) {
    movieList.value = res.data
  }
  movieLoading.value = false
}
onBeforeMount(() => getMovieList())
// #endregion

// 图片预览
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
const recommendChange = async row => {
  try {
    const data = await updateMovieRecommendApi({
      _id: row._id,
      recommend: row.recommend
    })
  } catch (err) {
    row.recommend = !row.recommend
  }
}
</script>
<template>
  <div class="movie-main">
    <el-form :model="movieFormObj" @submit.prevent class="demo-form-inline" size="default">
      <el-input v-model.trim="movieFormObj.filmTitle" placeholder="请输入名称/ID" :prefix-icon="Search" />
      <el-button type="primary" :icon="Search" @click="movieFind">查询</el-button>
    </el-form>
    <my-table v-loading="movieLoading" class="table-main" :data="movieList">
      <el-table-column align="center" type="index" label="索引" width="60" />
      <el-table-column align="center" label="id" prop="_id" />
      <el-table-column align="center" label="名称" prop="filmTitle" />
      <el-table-column align="center" label="时长" prop="duration" />
      <el-table-column align="center" label="logo" prop="duration">
        <template #default="{ row }">
          <img @click="perviewShowHandler(row.pictureUrl)" class="user-picture-mini" :src="row.pictureUrl" :alt="row.filmTitle" style="width: 60px; height: 60px; margin: auto" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否推荐">
        <template #default="{ row }">
          <el-switch v-model="row.recommend" active-color="#13c2c2" inactive-color="#ff4544" @change="recommendChange(row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="上映日期" prop="issueDate" show-overflow-tooltip />
      <el-table-column align="center" label="主演" prop="director" show-overflow-tooltip />
      <el-table-column align="center" label="标签" prop="tag" width="130" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag v-for="item in row.tag" :key="item.id">
            {{ tags[item].name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" prop="describe" show-overflow-tooltip />
      <el-table-column align="center" label="设置">
        <template #default="{ row }">
          <el-button type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </my-table>
    <el-image-viewer v-if="perviewShow" @close="perviewHideHandler" hide-on-click-modal close-on-press-escape :url-list="perviewList" teleported />
  </div>
</template>

<style scoped lang="scss">
.movie-main {
  height: 100%;
  display: flex;
  flex-direction: column;

  .demo-form-inline {
    display: flex;
    width: 430px;
    gap: 20px;
  }
  .table-main {
    flex: 1;
    .user-picture-mini {
      cursor: pointer;
    }
  }
}
</style>
<style scoped lang="scss">
.el-tag + .el-tag {
  margin-left: 12px;
}
</style>
