import AccountsPersistant from '../persistant/persistantStore.js'

const profile ={
    namespaced: true,
    state:{
        accounts:[], //Array of accounts
        activeAccount: null, //index of the account
        currentAccount: null //account object
    },
    mutations: {
        addAccount(state, account){
            state.accounts.push(account)
            state.activeAccount = state.accounts.length-1;
            state.currentAccount = account
        },
        changeAccount(state,index){
            if (index < state.accounts.length && 0 <= index){
                state.activeAccount = index 
                state.currentAccount = state.accounts[index]
            }
        },
        updateCurrentAccount(state, data){
            state.accounts[state.activeAccount] = data
            state.currentAccount = data
        },
        logout(state){
            state.accounts = []
            state.currentAccount = null
            state.activeAccount = null
        }
    },
    actions:{
        populateData(state){
            
        },

        profileAsync(state){
            return new Promise((resolve) => {
                let account = state.getters.currentAccount
                resolve(account)
            })
        }
    },
    getters:{
        currentAccount(state){
            if(state.accounts.length !== 0){
                return state.currentAccount
            }
        },

        getAccounts(state){
            return state.accounts
        }
    }
}

export default profile