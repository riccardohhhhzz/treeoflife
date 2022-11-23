import axios from "axios"

const userAbout = {
    namespaced: true,
    state: {
        username: '',
        password: '',
        email: '',
        birthday: {
            year: '',
            month: '',
            day: '',
        },
    },
    getters: {},
    actions: {
    },
    mutations: {},
}
export default userAbout