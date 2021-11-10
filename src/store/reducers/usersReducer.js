const GET_USERS = 'GET_USERS'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'
const SET_ISEDIT = 'SET_ISEDIT'
const SET_EDITING_USER= 'SET_EDITING_USER'
const HIGHLIGHT_FIELD= 'HIGHLIGHT_FIELD'
const ADD_USER = 'ADD_USER'
const SET_ISADD = 'SET_ISADD'
const NEW_USER_INFO ='NEW_USER_INFO'

const initialState = {
    users: null,
    isEdit: false,
    editingPerson: null,
    highlightField: null,
    isAdd: false,
    newUser: {
        id: '',
        key:'',
        name: '',
        email: '',
        website: '',
        company: ''
    }
}

const getEditField = (user1, user2, users) => {
    const result = users || []
    const user1Arr = Object.values(user1)
    const user2Arr = Object.values(user2)
    
    user1Arr.forEach( function (element) {
    if ( !~user2Arr.indexOf(element) ) result.push(element)
    });
    return result
}

export const usersReducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            
            return{
                ...state,
                users: action.data
            }

        case HIGHLIGHT_FIELD:
            const user = state.users.find( el => el.id === state.editingPerson.id)
            const highlightField= getEditField(state.editingPerson, user, state.highlightField)
            return{
                ...state,
                highlightField: highlightField
            }

        case REMOVE_USER: 
            const users = state.users.filter( el => el.id !== action.userId)
            return{
                ...state,
                users
            }
        

        case EDIT_USER: 
            
            {
                const users = state.users.map( el => {
                    if (el.id === state.editingPerson.id) return state.editingPerson
                    
                    return el 
                })
                return{
                ...state,
                users
            }}


        case SET_ISEDIT:
            return{
                ...state,
                isEdit: action.isEdit
            }
        
        case SET_EDITING_USER:
            return{
                ...state,
                editingPerson: action.user
            }

        case ADD_USER:
            return{
                ...state,
                users: [...state.users, action.user]
            }
        
        case SET_ISADD:
            return {
                ...state,
                isAdd: action.isAdd
            }
        case NEW_USER_INFO: 
            return{
                ...state,
                newUser: action.newUser
            }
        default:
            return {...state}    
    }
}

export const getUsersCreator = (data) => ({type: GET_USERS, data})
export const removeUserCreator = (userId) => ({type: REMOVE_USER, userId})
export const editUserCreator = (user) => ({type: EDIT_USER, user})
export const isEditCreator = (isEdit) => ({type: SET_ISEDIT, isEdit})
export const editingPersonCreator = (user) => ({type: SET_EDITING_USER, user})
export const highlightFieldCreator = () => ({type: HIGHLIGHT_FIELD})
export const addUserCreator = (user) => ({type: ADD_USER, user})
export const setIsAddCreator = (isAdd) => ({type: SET_ISADD, isAdd})
export const setNewUserCreator = (newUser) => ({type: NEW_USER_INFO, newUser})
