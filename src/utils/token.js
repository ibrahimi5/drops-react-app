const tokenName = 'userToken'

export const setToken = (token) =>{
    localStorage.setItem(tokenName, token)
}

export const getToken = () => {
    return localStorage.getItem (tokenName)
}

export const removeToken = () =>{
    localStorage.removeItem(tokenName)
}

export const getUserFromToken = () =>{
    const token = getToken()

    if(!token){return null}
   
    const usefullInfo = token.split('.')[1]
    
    const userString = atob(usefullInfo)
    
    const{user, exp} = JSON.parse(userString)
    
    if (exp<Date.now()/1000){
        removeToken()
        return null
    }
   
    return user
}