import { writableLS } from './localStorage'

// variable managing accounts

const loggedInInstances = writableLS({})
const instanceThemes = writableLS({})

// variables about UI
const autoplayVideos = writableLS(false)
const disableFavCounts = writableLS(false)
const disableFollowersCount = writableLS(false)

