import axios from "axios"
import { SessionUtils } from "@/utils";

export default {
    namespaced: true,
    state: {
        userInfo: SessionUtils.get('user'),
    },
    getters: {
        birthday(state) {
            var year = state.userInfo.birthday["year"];
            var month = state.userInfo.birthday["month"];
            var day = state.userInfo.birthday["day"];
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            return month + "." + day + " ," + year;
        }
    },
    actions: {
    },
    mutations: {
        INITUSERINFO(state, value) {
            state.userInfo = value;
        }
    },
}