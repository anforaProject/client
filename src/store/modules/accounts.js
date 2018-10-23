const relationships ={
    namespaced: true,
    state:{
        accounts:{},
    },
    mutations: {
        addAccount(state, relationship){
            state.accounts[relationship.id] = relationship
        }
    },
    getters:{
        getRelation: (state) => (id) =>{
            return state.accounts[id] 
        }
    }
}

export default relationships
