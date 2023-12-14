

const initState = {
    users: [],
    error: null,
    loading: false
}

export default (state = initState,  action) =>
{
    switch(action.type)
    { 
        case 'LOAD_USERS_REQUEST':
            state = {
                ...state,
                loading: true
            }
        break;
        

        case 'LOAD_USERS_SUCCESS':
        state = {
            ...state,
            loading: false,
            users: action.payload.users
        }
        break;

        case 'LOAD_USERS_FAILURE':
        state = {
            ...state,
            loading: false,
            error: action.payload.error
        }
        break;

        case 'USER_REGISTER_REQUEST':
            state = {
                ...state,
                loading: true
            }
        break;

        case 'USER_REGISTER_SUCCESS':
        state = {
            ...state,
            loading: false,
            users: action.payload.users
        }
        break;

        case 'USER_REGISTER_FAILURE':
        state = {
            ...state,
            loading: false,
            error: action.payload.error
        }
        break;

        // default:
        //     return initState;

    }

    return state;
}

