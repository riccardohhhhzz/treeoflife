import axios from "axios";

export default {
    namespaced: true,
    state: {
        pastDaysCondition: null,
    },
    actions: {
        initPastDaysCondition(context, value) {
            context.commit('INITPASTDAYSCONDITION', value)
        },
        updateCondition(context, value) {
            context.commit('UPDATETODAYCONDITION', value)
        },
    },
    mutations: {
        INITPASTDAYSCONDITION(state, value) {
            state.pastDaysCondition = value
        },
        UPDATETODAYCONDITION(state, value) {
            state.pastDaysCondition[state.pastDaysCondition.length - 1] = value
        },
    }
}
