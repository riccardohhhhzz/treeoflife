import VueRouter from "vue-router";

//引入路由组件
import Login from "../pages/Login";
import Register from "../pages/Register";
import SetNewPsw from "../pages/SetNewPsw";
import Verification from "../pages/Verification"
import Homepage from "../pages/Homepage"

//创建router实例对象
const router = new VueRouter({
    routes: [
        {
            name: "default",
            path: '/',
            component: Login,
        },
        {
            name: "login",
            path: '/login',
            component: Login,
        },
        {
            name: "register",
            path: '/register',
            component: Register
        },
        {
            name: "setnewpsw",
            path: "/setnewpsw",
            component: SetNewPsw,
        },
        {
            name: "verify",
            path: "/verify",
            component: Verification,
        },
        {
            name: "homepage",
            path: "/home",
            component: Homepage,
        }
    ]
})

//暴露router对象
export default router