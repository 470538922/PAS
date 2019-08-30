// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import store from './store'
import axios from 'axios'
import router from './router';
import base from "./base.js";
import Axios from './AxiosRequest';
import global from './components/global/Global'
import menuSourceMap from "./router/routeMap";
import {
  Affix,
  Anchor,
  AutoComplete,
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Collapse,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  LocaleProvider,
  message,
  Menu,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Spin,
  Steps,
  Switch,
  Table,
  Transfer,
  Tree,
  TreeSelect,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  // Mention,
  Upload,
  // version,
  Drawer,
  Skeleton,
  Comment,
  ConfigProvider,
} from 'ant-design-vue';
Vue.config.productionTip = false;
Vue.prototype.Axios = Axios;
Vue.prototype.$axios = axios;
Vue.prototype.router = router;
Vue.prototype.global = global;
Vue.use(Vuex)
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;


Vue.use(Affix);
Vue.use(Anchor);
Vue.use(AutoComplete);
Vue.use(Alert);
Vue.use(Avatar);
Vue.use(BackTop);
Vue.use(Badge);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(Carousel);
Vue.use(Cascader);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Dropdown);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Layout);
Vue.use(List);
Vue.use(LocaleProvider);
Vue.use(Menu);
Vue.use(Modal);
Vue.use(Pagination);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(Radio);
Vue.use(Rate);
Vue.use(Row);
Vue.use(Select);
Vue.use(Slider);
Vue.use(Spin);
Vue.use(Steps);
Vue.use(Switch);
Vue.use(Table);
Vue.use(message);
Vue.use(Transfer);
Vue.use(Tree);
Vue.use(TreeSelect);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(TimePicker);
Vue.use(Timeline);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.use(Skeleton);
Vue.use(Comment);
Vue.use(ConfigProvider);
const instance = axios.create({});
let permissionUrl = [];
// 登录拦截
router.beforeEach((to, from, next) => {
  // global.imgPath = sessionStorage.getItem("imgPath");
  if (permissionUrl.length === 0) permissionUrl = JSON.parse(sessionStorage.getItem("permissionUrl") || '[]');
  let isLogin = sessionStorage.getItem('token')
  instance.defaults.headers.common["token"] = isLogin;
  if (to.meta.requireAuth) { // 判断是否需要登录权限
    if (isLogin) { // 判断是否登录
      let isHasPermission = false;
      for (let i = 0, l = menuSourceMap.length; i < l; i++) {
        for (let m = 0, n = menuSourceMap[i].subMenu.length; m < n; m++) {
          let isCheck = permissionUrl.find(p => p.module === menuSourceMap[i].subMenu[m].permissionCode) ? true : false;
          let isRoute = menuSourceMap[i].subMenu[m].routeReg ? menuSourceMap[i].subMenu[m].routeReg.test(to.fullPath) : (menuSourceMap[i].subMenu[m].route === to.path) ? true : false;
          if ('/Organization' === menuSourceMap[i].subMenu[m].route) {

          }
          if (isRoute && (isCheck || menuSourceMap[i].defaultDock)) {
            isHasPermission = true;
            break;
          }
        }
      }
      if (isHasPermission) {
        next()
      } else {
        message.error("抱歉，您无权访问该页面！")
      }
    } else { // 没登录则跳转到登录界面
      window.location.href = "/login.html"
      // next({
      //   path: 'login.html',
      //   query: {
      //     redirect: to.fullPath
      //   }
      // })
    }
  } else {
    next()
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})
