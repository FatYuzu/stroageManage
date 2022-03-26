<template>
  <header>
    <!-- 左侧 -->
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="small"
      ></el-button>
      <!-- <h3 style="color:white">首页</h3> -->
      <!-- 面包屑 -->
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="item.path">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb> -->
      <!-- tag组件 -->
      <div class="tabs">
        <el-tag
          size="medium"
          v-for="(item, index) in tags"
          :key="item.path"
          :closable="item.name !== 'home'"
          :effect="$route.name === item.name ? 'dark' : 'light'"
          @click="changeMenu(item)"
          @close="handleMenuClose(item, index)"
        >
          {{ item.label }}
        </el-tag>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="r-content">
      <el-dropdown trigger="hover" size="medium">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState ,mapMutations } from "vuex"; //引入vuex中store的数据
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.jpg"),
    };
  }, 
  methods: {
    ...mapMutations({
        close:'closeTag'
    }),
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    changeMenu(item) {
        this.$router.push({name:item.name})
    },
    handleMenuClose(item, index) {
        const length = this.tags.length -1
        this.close(item)
        if(item.name!== this.$route.name){
            return;
        }
        if(index ===length){
            this.$router.push({
                name:this.tags[index-1].name
            })
        }else{
            this.$router.push({
                name:this.tags[index].name
            })
        }
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')

    }
  },
  computed: {
    //mapState是state的辅助函数
    //使用...对象展开运算符将此对象混入到外部对象中
    ...mapState({
      tags: (state) => state.tab.tabsList, //获取面包屑数据
    }),
  },
};
</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.tabs{
    display: flex;
    align-items: center;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
        
    }
}
</style>