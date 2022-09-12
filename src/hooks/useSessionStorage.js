export default function useSessionStorage() {
    const setSessionAppItem = (key, value) => sessionStorage.setItem(key, value)
    const getSessionAppItem = (key, defaultVal) => {
        return sessionStorage.getItem(key) ?? defaultVal
    }
    const removeSessionAppItem = (key) => sessionStorage.removeItem(key)
    const clearAllSession = () => sessionStorage.clear()
    return { setSessionAppItem, getSessionAppItem, removeSessionAppItem, clearAllSession }
}