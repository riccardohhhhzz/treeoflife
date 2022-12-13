import VueRouter from "vue-router";

//引入路由组件
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SetNewPsw from "../pages/auth/SetNewPsw";
import Verification from "../pages/auth/Verification"
import Homepage from "../pages/home/Homepage"
import Notfound from "../pages/error/Notfound";
import SmallHomepage from "../components/homepage/SmallHomepage";
import MyHealth from "../components/homepage/MyHealth";
import PersonalCenter from "../components/homepage/PersonalCenter";
import HelpPage from "../components/homepage/HelpPage";
import SettingPage from "../components/homepage/SettingPage";

//创建router实例对象
const router = new VueRouter({
    routes: [
        {
            name: "default",
            path: '/',
            component: Login,
            meta: {
                isAuth: false
            }
        },
        {
            name: "login",
            path: '/login',
            component: Login,
            meta: {
                isAuth: false
            }
        },
        {
            name: "register",
            path: '/register',
            component: Register,
            meta: {
                isAuth: false
            }
        },
        {
            name: "setnewpsw",
            path: "/setnewpsw",
            component: SetNewPsw,
            meta: {
                isAuth: true
            }
        },
        {
            name: "verify",
            path: "/verify",
            component: Verification,
            meta: {
                isAuth: true
            }
        },
        {
            path: "/e",
            component: Homepage,
            meta: {
                isAuth: true
            },
            // 默认重定向到我的健康
            redirect: "/e/myhealth",
            children: [
                {
                    path: "homepage",
                    component: SmallHomepage,
                    meta: {
                        isAuth: true
                    },
                },
                {
                    path: "myhealth",
                    component: MyHealth,
                    meta: {
                        isAuth: true
                    },
                },
                {
                    path: "personalcenter",
                    component: PersonalCenter,
                    meta: {
                        isAuth: true
                    },
                },
                {
                    path: "help",
                    component: HelpPage,
                    meta: {
                        isAuth: true
                    },
                },
                {
                    path: "setting",
                    component: SettingPage,
                    meta: {
                        isAuth: true
                    },
                }
            ]
        },
        {
            name: "notfound",
            path: "/404",
            component: Notfound,
            meta: {
                isAuth: false
            }
        }
    ]
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    if (!to.meta) return next('/404')
    if (!to.meta.isAuth) return next()
    const user = window.sessionStorage.getItem('user')
    if (to.path.includes("/e")) {
        if (!user) {
            return next('/404')
        }
        //暂时用username作为token验证
        const token = JSON.parse(user)['username']
        const active = JSON.parse(user)['state']
        if (!token || !active) {
            return next('/404')
        }
        else {
            return next()
        }
    }

    if (to.path === "/setnewpsw") {
        if (from.path === "/verify") {
            return next()
        }
        else {
            return next('/404')
        }
    }

    if (to.path === "/verify") {
        if (!to.params['email']) {
            return next('/404')
        }
        else {
            return next()
        }
    }
})
//暴露router对象
export default router