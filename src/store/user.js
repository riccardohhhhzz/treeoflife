import axios from "axios"
import { SessionUtils } from "@/utils";

export default {
    namespaced: true,
    state: {
        userInfo: SessionUtils.get('user'),
    },
    getters: {
        sex(state) {
            let sex = state.userInfo.gender;
            if (sex === 'male') {
                return "男";
            } else if (sex === 'female') {
                return "女";
            } else {
                return null;
            }
        },
        birthday(state) {
            let year = state.userInfo.birthday["year"];
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
        }
    },
}