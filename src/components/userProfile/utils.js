export default class ProfileManager {
    constructor(user){
        this.user = user
    }
}

function isMe(account, user){
    return account.id == user.id
} 