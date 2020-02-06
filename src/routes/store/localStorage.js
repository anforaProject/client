import { writable } from 'svelte/store'

import localStorageMemory from 'localstorage-memory'

// test wheter localstorage is available

const localStorageAvailable = () =>{

    let testKey = '__testKey'

    try{
        localStorage.setItem(testKey, testKey)
        if (!localStorage.length || localStorage.getItem(testKey) !== testKey){
            return false
        }
        localStorage.removeItem(testKey)
    }catch (e){
        return false
    }
    return true
}

// Define a storage based on the search for a localstorage

const LS = localStorageAvailable() ? localStorage : localStorageMemory

// create a writable storage that can be saved to
// browser localstorage
export const writableLS = (key, initValue) => {
    const { subscribe, set } = writable(initValue);

    const value = LS.getItem(key);
    if (value) {
        set(value);
    }
    
    subscribe(current => {
        LS.setItem(key, current);
    });

    return {
        subscribe,
        set
    };
}
