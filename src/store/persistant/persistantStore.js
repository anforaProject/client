import Datastore from 'nedb-promises'

class AccountsPersistant{
    constructor(){
        this.accounts = Datastore.create({filename:'accounts.db', autoload:true});
    }

    //Manage accounts

    addAccount(account){
        this.accounts.insert(account)
    }
    
    retriveAccount(accountId){
        return this.accounts.findOne({id:accountId})
    }

    numberOfAccounts(){
        return this.accounts.count({})
        .then(
            count => {return count}
        )
    }

    retriveAllAccounts(){
        return this.accounts.find({})
    }
}

export default new AccountsPersistant()