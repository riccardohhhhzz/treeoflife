export class SessionUtils {
    static get(key) {
        return JSON.parse(window.sessionStorage.getItem(key))
    }
    static set(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    }
    static remove(key) {
        window.sessionStorage.removeItem(key)
    }
}