import axios from "axios"
import { SessionUtils } from "@/utils";

export default {
    namespaced: true,
    state: {
        userInfo: SessionUtils.get('user'),
    },
    getters: {
        infoPerfected(state) {
            const userinfo = state.userInfo;
            return Boolean(
                userinfo.birthday &&
                userinfo.city &&
                userinfo.email &&
                userinfo.gender &&
                userinfo.height &&
                userinfo.hobbies &&
                userinfo.province &&
                userinfo.story &&
                userinfo.height
            );
        },
        sex(state) {
            const sex = state.userInfo.gender;
            if (sex === 'male' || sex === "男") {
                return "男";
            } else if (sex === 'female' || sex === "女") {
                return "女";
            } else {
                return null;
            }
        },
        birthday(state) {
            const year = state.userInfo.birthday["year"];
            let month = state.userInfo.birthday["month"];
            let day = state.userInfo.birthday["day"];
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            return month + "." + day + " ," + year;
        },
    },
    actions: {
    },
    mutations: {
        INITUSERINFO(state, value) {
            state.userInfo = value;
        },
    },
}