import {configureStore} from '@reduxjs/toolkit'
// import use from '@mui/material/utils/useId'
import userslice from './userslice.js'
import channelslice from './channelslice.js';
const store=configureStore({
    reducer:{user:userslice.reducer,channel:channelslice.reducer}
})

export default store;