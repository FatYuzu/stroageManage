<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧 -->
    <el-col :span="8" style="margin-top: 20px">
      <!-- 左上用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">系统管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-3-4</span></p>
          <p>上次登录地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card shadow="hover">
        <!-- 左中日历 -->
        <el-calendar style=" height:500px" v-model="calendarValue"></el-calendar>
      </el-card>
      <!-- 左下近期用户登录信息 -->
      <el-card style="margin-top: 20px; height: 400px" shadow="hover">
        <h3>近期登录用户</h3>
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧 -->
    <el-col style="margin-top: 20px" :span="16">
      <!-- 右上电子介质管理和档案管理基本信息 -->
      <div class="num">
        <el-card
        class="num-item"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: flex, padding: 0 }"
          shadow="hover"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 右下电子介质管理和档案管理基本信息图表显示 -->
      <el-card style="height: 400px" > 

      </el-card>
      <el-card style="height: 400px"> 
        
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../../api/data.js";
// import * as echarts from 'echarts'
export default {
  name: "User",
  data() {
    return {
      userImg: require("../../assets/images/user.jpg"),
      calendarValue:new Date(),
      tableData: [],
      tableLabel: {
        name: "用户名",
        todayBuy: "登录时间",
        monthBuy: "登录IP",
      },
      countData: [
        {
          name: "电子介质数量",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "总记录数",
          value: 15610,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "总文件数",
          value: 14830,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    //获得mockhome数据
    getData().then((res) => {
      //code:用来识别是不是tableData的数据
      const { code, data } = res;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData= order.date
        //Object.keys(obj)  传入的是对象：返回所传对象的key值，
        const keyArray= Object.keys(order.data[0])
        const series=[]
        //forEach和Map的功能都是一样的,都是为每一个元素执行提供的函数
        //但forEach无返回值
        //map有返回值
        keyArray.forEach(key=>{
          series.push({
            name:key,
            data:order.data.map((item)=>{
              item[key]
            }),
            type:'line'
          })
        })
        const option={
          xAxis:{
            data:xData
          },
          yAxis:{},
          legend:{
            data:keyArray
          },
          series:series
          
        }
              console.log(xData)
              console.log(keyArray)
              console.log(series)
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)
      }
      console.log(res);
    });
  },
};
</script>
<style lang="less" scoped>
  // .num-item{
  //   display: flex;
  //   justify-content: space-between;
  // }
</style>