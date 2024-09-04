export function validateUser(user, setUser) {
    if ((!user || user === 0) && localStorage.user) {
        setUser({ ...JSON.parse(localStorage.user) }); 
    }
}