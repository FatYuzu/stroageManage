import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Card,
  Col,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Pagination,
  MessageBox,
  Message,
  Image,
  Progress,
  Upload,
  Calendar
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/index.less";

import store from "./store";
import router from "../rounter";
import http from "axios";
import "../api/mock.js";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Image);
Vue.use(Progress)
Vue.use(Upload)
Vue.use(Calendar)

Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

//导航守卫
router.beforeEach((to, from, next) => {
  //根据getToken方法获取token信息，防止页面刷新丢失token信息
  store.commit("getToken");
  const token = store.state.user.token;
  //如果token不存在且要去的页面不是登录页
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } //如果token存在且要去的页面是登录页
  else if(token&&to.name==="login"){
    next({name:"home"})
  } else{
    next();
  }
});

new Vue({
  store,
  router,
  render: (h) => h(App),
  //解决登录后刷新却白屏的问题
  created(){
    store.commit('addMenu',router)
  }
}).$mount("#app");
