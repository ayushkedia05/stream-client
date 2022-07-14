import {createSlice} from '@reduxjs/toolkit'

const channelslice=createSlice({
    name:'channel',
    initialState:{currentid:''},
    reducers:{
       addchannelid(state,action){
        state.currentid=action.payload;
       }

    }
});


export const channelActions=channelslice.actions;
export default channelslice;