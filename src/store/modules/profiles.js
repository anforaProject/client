import AccountsPersistant from '../persistant/persistantStore.js'

const profile ={
    namespaced: true,
    state:{
        accounts:[],
        activeAccount: null        
    },
    mutations: {
        addAccount(state, account){
            state.accounts.push(account)
            if(state.activeAccount === null){
                state.activeAccount = state.accounts.length-1;
            }
        },
        changeAccount(state,index){
            if (index < state.accounts.length && 0 <= index){
                state.activeAccount = index 
            }
        }
    },
    actions:{
        populateData(state){
            if(state.getters.getAccounts.length === 0){
                // If there is no accounts try to search in the db
                AccountsPersistant.numberOfAccounts().then(
                    number =>{
                        if (number > 0){
                            AccountsPersistant.retriveAllAccounts()
                            .then(
                                docs =>{
                                    docs.forEach(element => {
                                        state.commit('addAccount',element)
                                    });
                                }
                            )
                            
                        }
                    }
                )

                state.commit('changeAccount', 0)
            }
        }
    },
    getters:{
        currentAccount(state){
            if(state.accounts.length !== 0){
                return state.accounts[state.activeAccount]
            }
        },

        getAccounts(state){
            return state.accounts
        }
    }
}

export default profile