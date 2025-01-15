//Actions

export const setUser = (user) => ({
    type : "SET_USER",
    payload : user
});

export const removeUser = () => ({
    type: "REMOVE_USER"
});

export const setAddressUser = (adress) => ({
    type: "SET_ADDRESS_USER",
    payload: adress
})