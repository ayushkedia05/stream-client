import React,{useCallback,useEffect,useRef,useState} from "react";
import { Avatar,useChatContext } from "stream-chat-react";
// import _debounce from 'lodash-'


import { XButton, XButtonBackground } from '../../assets';

import './CreateChannel.css';


const UserResult = ({ user }) => (
    <li className='messaging-create-channel__user-result'>
      <Avatar image={user.image} name={user.name || user.id} size={40} />
      {user.online && <div className='messaging-create-channel__user-result-online' />}
      <div className='messaging-create-channel__user-result__details'>
        <span>{user.name}</span>
        {/* <span className='messaging-create-channel__user-result__details__last-seen'>{user.online}</span> */}
      </div>
    </li>
  );



  