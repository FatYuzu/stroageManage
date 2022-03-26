import Cookie from "js-cookie"
// import router from "router"
export default{
    state:{
        isCollapse:false,//左侧菜单折叠：false为非折叠，true为折叠
        tabsList:[//面包屑数据
            {
                path:'/',
                name:'home',
                lable:'首页',
                icon:'home'
            }
        ],
        currentMenu:null,//记录是哪个面包屑高亮
        menu:[],//左侧边栏目录
    },
    //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
    mutations:{
        //接受 state 作为第一个参数
        collapseMenu(state){
            state.isCollapse =!state.isCollapse 
        },
        selectMenu(state,val){
            //当点击的菜单不是home首页
            if(val.name!=='home'){
                state.currentMenu=val
                const result = state.tabsList.findIndex(item=>item.name===val.name)
                if(result ===-1){
                    state.tabsList.push(val)
                }
            }else{
                state.currentMenu=null
            }
            console.log(state.tabsList)
        },
        closeTag(state,val){
            const result = state.tabsList.findIndex(item=>item.name===val.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state,val){
            state.menu=val
            //向cookie中存储json信息
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu=[]
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            //parse将cookie中的menu数据转成menu对象Object类型
            const menu =JSON.parse(Cookie.get('menu'))
            state.menu =menu
            const menuArray=[]
            //↓给menuArray存入路由的相关数据
            menu.forEach(item => {
                if(item.children){
                    item.children=item.children.map(item =>{
                        item.component=()=>import(`../../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component=()=>import(`../../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        }
    }
}