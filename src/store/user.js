import axios from "axios"
import { SessionUtils } from "@/utils";

export default {
    namespaced: true,
    state: {
        userInfo: SessionUtils.get('user'),
    },
    actions: {
    },
    mutations: {
        INITUSERINFO(state, value) {
            state.userInfo = value;
        }
    },
}