<template>
  <el-container>
    <el-header>
      <h3>和弦库</h3>
    </el-header>

    <el-container id="container">
      <el-aside width="300px">
        <el-menu
          :default-active="$route.path"
          :router="true">
          <el-menu-item v-for="route in menu" :key="route.path" :index="route.path" >
            <i class="el-icon-menu"></i>
            <span slot="title">{{route.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menu from '../../router/menu'

export default {
  name: 'dashboard',
  data () {
    return {
      menu
    }
  },
  created () {
  }
}
</script>

<style>
.el-container {
  height: 100vh;
}
.el-header{
  border-bottom: 1px solid #eee
}

.el-main {
  background-color: #fff;
  color: #333;
}
</style>
