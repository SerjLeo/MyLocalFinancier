export default class InterfaceStateService {
    getProperty(name) {
        let interfaceState = localStorage.getItem('interfaceState')?JSON.parse(localStorage.getItem('interfaceState')):null
        if(interfaceState && interfaceState[name]) {
            return interfaceState[name]
        } else {
            this.setProperty(name)
            return false
        }
    }

    setProperty(name, state = false) {
        let interfaceState = localStorage.getItem('interfaceState')?JSON.parse(localStorage.getItem('interfaceState')):null
        if(interfaceState) {
            localStorage.setItem('interfaceState', JSON.stringify(
                Object.assign(interfaceState, {
                    [name]: state
                })
            ))
        } else {
            localStorage.setItem('interfaceState', JSON.stringify({
                [name]: false
            }))
        }
    }
}
