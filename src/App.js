import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import '@stream-io/stream-chat-css/dist/css/index.css';
import './App.css';

import Auth from './components/Auth';
import {
  CreateChannel,
  CustomMessage,
  MessagingChannelList,
  MessagingChannelPreview,
  MessagingInput,
  MessagingThreadHeader,
} from './components';

import { ChannelInner } from './components/ChannelInner/ChannelInner';



const cookies = new Cookies();

const apiKey = 'rc6s6y5c9g5g'
const userToken = cookies.get("token");
const user =cookies.get('userId')

const filters = 
   { type: 'messaging', members: { $in: [user] } }

const options = { state: true, watch: true, presence: true, limit: 8 };

const sort = {
  last_message_at: -1,
  updated_at: -1,
};

// const userToConnect = { id: user, name: user, image: getRandomImage() };


export const GiphyContext = React.createContext({});

const App = () => {
  const [chatClient, setChatClient] = useState(null);
  const [giphyState, setGiphyState] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const [theme, setTheme] = useState('dark');

  const authToken = cookies.get("token");

  const client = StreamChat.getInstance(apiKey);
  
  if(authToken) {
      client.connectUser({
          id: cookies.get('userId'),
          name: cookies.get('username'),
          fullName: cookies.get('fullName'),
          image: cookies.get('avatarURL'),
          hashedPassword: cookies.get('hashedPassword'),
          phoneNumber: cookies.get('phoneNumber'),
      }, authToken)



  }
  

  useEffect(() => {
    const handleThemeChange = ({ data, origin }) => {
      // handle events only from trusted origin
 
        if (data === 'light' || data === 'dark') {
          setTheme(data);
        }
      
    };

    window.addEventListener('message', handleThemeChange);
    return () => window.removeEventListener('message', handleThemeChange);
  }, []);

  useEffect(() => {
    const mobileChannelList = document.querySelector('#mobile-channel-list');
    if (isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else if (!isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }, [isMobileNavVisible]);

  useEffect(() => {
    /*
     * Get the actual rendered window height to set the container size properly.
     * In some browsers (like Safari) the nav bar can override the app.
     */
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();

    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  const toggleMobile = () => setMobileNav(!isMobileNavVisible); 

  const giphyContextValue = { giphyState, setGiphyState };



  if(!userToken) return <Auth />  
  return (
    <Chat client={client} theme={`messaging light`}>
      <div id='mobile-channel-list' onClick={toggleMobile}>
       
        {/* <ChannelSearch></ChannelSearch> */}
        <ChannelList
          filters={filters}
          sort={sort}
          options={options}
          List={(props) => (
            
            <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
            )}
            Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
        />
      </div>
      <div>
        <Channel
          Input={MessagingInput}
          maxNumberOfFiles={10}
          Message={CustomMessage}
          multipleUploads={true}
          ThreadHeader={MessagingThreadHeader}
          TypingIndicator={() => null}
        >
          {isCreating && (
            <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />
          )}
          <GiphyContext.Provider value={giphyContextValue}>
            <ChannelInner theme={theme} toggleMobile={toggleMobile} />
          </GiphyContext.Provider>
        </Channel>
      </div>
      {/* </div> */}
    </Chat>

  );
};

export default App;




















