import axios from "axios"

export const API = {
    getUsers: async() => {
        const url = 'https://jsonplaceholder.typicode.com/users'

        const response = await axios.get(url)
        return response.data.filter( el => el.id <= 5)
    }
}