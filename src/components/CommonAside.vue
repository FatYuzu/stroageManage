<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="white"
    active-text-color="#ffd04b"
  >
    <h3>{{isCollapse?'管理系统':'华农档案馆管理系统'}}</h3>
    <!-- 无分页 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 有分页 -->
    <el-submenu
     v-for="item in hasChildren" :index="item.path" :key="item.path">
     <!-- 主标题 -->
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 主标题下的分页组 -->
      <el-menu-item-group
        v-for="(subitem, subindex) in item.children"
        :index="item.path"
        :key="subitem.path"
      >
       <!-- 主标题下的分页组的分页 -->
        <el-menu-item :index="subindex" @click="clickSubMenu(subitem)">{{ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style lang="less" scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name:item.name,//name属性可以控制路由跳转
      });
    //  console.log(item.name)
      this.$store.commit('selectMenu',item)
    },
    clickSubMenu(subitem){
      this.$router.push({
        name:subitem.name,
      })
      //  console.log(subitem.name)
       this.$store.commit('selectMenu',subitem)
    }
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse(){
        return this.$store.state.tab.isCollapse
    },
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  },
};
</script>