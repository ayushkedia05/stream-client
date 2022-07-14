import {createSlice} from '@reduxjs/toolkit'

const userslice=createSlice({
    name:'users',
    initialState:{ismoderator:false,isadmin:false},
    reducers:{
        togglemod(state)
        {
            state.ismoderator=true;
        },
        toggleadmin(state){
            state.isadmin=true;
        }

    }
});


export const userActions=userslice.actions;
export default userslice;