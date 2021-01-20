<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ firstName }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ secondName }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyBreadcrumb',
  props: {
    firstName: String,
    secondName: String
  }
}
</script>

<style>
</style>