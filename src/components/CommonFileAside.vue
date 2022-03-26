<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>档案分类目录</h3>
    <!-- 无分页 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 有分页 -->
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <!-- 主标题 -->
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 主标题下的分页组 -->
      <el-menu-item-group
        v-for="(subitem, subindex) in item.children"
        :index="item.path"
        :key="subitem.path"
      >
        <!-- 主标题下的分页组的分页 -->
        <el-menu-item :index="subindex" @click="clickSubMenu(subitem)">{{
          subitem.label
        }}</el-menu-item>
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
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "",
          label: "档案借阅登记",
          icon: "files",
          url: "/",
        },
        {
          label: "档案馆分类档案表(按卷计和按件计)",
          icon: "files",
          children: [
            {
              path: "/",
              name: "",
              label: "01党群",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "02行政",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "03教学",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "04科研",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "05产品",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "06基建",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "07设备",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "08出版",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "09外事",
              icon: "folder",
              url: "",
            },
          ],
        },
        {
          label: "档案馆分类档案表(按件计)",
          icon: "files",
          children: [
            {
              path: "/",
              name: "",
              label: "毕业合影",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "房地产权证",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "科研奖状",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "专利证书",
              icon: "folder",
              url: "",
            },
          ],
        },
        {
          label: "评估档案(毕业生论文)",
          icon: "location",
          children: [
            {
              path: "/",
              name: "",
              label: "材料与能源学院",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "电子工程学院",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "动物科学学院",
              icon: "folder",
              url: "",
            },
            {
              path: "/",
              name: "",
              label: "工程基础教学与训练中心",
              icon: "folder",
              url: "",
            },
          ],
        },
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
        name: item.name, //name属性可以控制路由跳转
      });
      //  console.log(item.name)
      this.$store.commit("selectMenu", item);
    },
    clickSubMenu(subitem) {
      this.$router.push({
        name: subitem.name,
      });
      //  console.log(subitem.name)
      this.$store.commit("selectMenu", subitem);
    },
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      // return this.$store.state.tab.menu
      return menu;
    },
  },
};
</script>