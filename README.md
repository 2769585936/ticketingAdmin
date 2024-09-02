# TICKETIMGADMIN 

1. 此项目在众多后台项目中找到灵感,写出属于自己的后台管理系统

用户名 admin
密  码 12345678
## Aside 栏 设计思路
1. Aside 数据从Routes中获取,遍历数据,route的属性hidder为true 不在Aside显示
2. 有children 视为多级菜单 需要使用递归组件 遍历自身
3. 没有childern 则是最后一级菜单停止递归

## 面包屑 设计思路
1. 首页是固定的  其余项通过route.mtach遍历进行展示
2. 用transition-group 增强面包屑切换效果

## 缓存栏 设计思路
1. 首页是固定的  其余项通过监听route进行修改添加
2. 缓存 使用keep-alive 进行缓存 max 10  最多缓存10条
3. 缓存栏的scroll  使用el-scroll 只有内容大于宽度才显示

## 主内容 设计思路
1. 在 main 中使用 route-view 
2. 使用transition 增强交互体验
3. 缓存 使用keep-alive 进行缓存 max 10  最多缓存10条

## 二次封住组件 设计思路
1. 对相同组件进行样式统一
2. 对dialog 的 footer 进行统一
   1. 在自定义dialog组件中 
   ``<template #footer>
      <slot name="footer">xxxxx</slot>
     <template>``
   2. 有其他属性可以通过prop更加详细设计 
   3. slot + prop 
3. 对table进行样式统一
   
## 配置环境    设计思路
1. 通过 env 文件添加环境变量
2. 在node 环境中 使用view 中的 loadEnv
3. view.config.js 根据环境变量 获取到当前是开发还是生产环境 进行打包或编译详细设计
4. 在vue文档中 可以使用 import.meta.env 获取环境变量 可以对axios二次封装取到一定作用
