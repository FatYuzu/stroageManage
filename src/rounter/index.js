import Vue from 'vue'
import VueRouter from 'vue-router'
// import User from '../views/User.vue'
Vue.use(VueRouter)

const routes =[
    {
        path:'/',   //匹配的路径，这个指的是根目录
        name:'Main',
        component:()=>import('../views/Main.vue'),
        children:[
            // {
            //     path:'/home',
            //     name:'home',//控制name属性进行跳转
            //     component:()=>import('../views/home')
            // },
            // {
            //     path:'/storageManage',
            //     name:'storageManage',
            //     component:()=>import('../views/storageManage')
            // },
            // {
            //     path:'/fileManage',
            //     name:'fileManage',
            //     component:()=>import('../views/fileManage')
            // },
            // {
            //     path:'/user',
            //     name:'user',
            //     component:()=>import('../views/user')
            // },
            // {
            //     path:'/page1',
            //     name:'page1',
            //     component:()=>import('../views/other/pageOne.vue')
            // },
            // {
            //     path:'/page2',
            //     name:'page2',
            //     component:()=>import('../views/other/pageTwo.vue')
            // },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/login')
    },
]

const router = new VueRouter({
    mode:'history',//路由匹配模式
    routes
})

export default router