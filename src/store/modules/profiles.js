import AccountsPersistant from '../persistant/persistantStore.js'

const profile ={
    namespaced: true,
    state:{
        accounts:[],
        activeAccount: null,
        currentAccount: null        
    },
    mutations: {
        addAccount(state, account){
            state.accounts.push(account)
            if(state.activeAccount === null){
                state.activeAccount = state.accounts.length-1;
                state.currentAccount = account
            }
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
            console.log(state.currentAccount)
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