import React, { useEffect } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import ChannelSearch from "../ChannelSearch";
import Search from "../../modal/search";
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

import "./MessagingChannelList.css";
import { SkeletonLoader } from "./SkeletonLoader";

import { CreateChannelIcon } from "../../assets";
import streamLogo from "../../assets/stream.png";

const MessagingChannelList = ({
  children,
  error = false,
  loading,
  onCreateChannel,
}) => {
  const { client, setActiveChannel } = useChatContext();
  const { id, image = streamLogo, name = "Example User" } = client.user || {};

  useEffect(() => {
    const getDemoChannel = async (client) => {
      const channel = client.channel("messaging", "first", {
        name: "Social Demo",
        demo: "social",
      });
      await channel.watch();
      await channel.addMembers([
        { user_id: client.user.id, channel_role: "channel_moderator" },
      ]);
      setActiveChannel(channel);
    };

    if (!loading && !children?.props?.children?.length) {
      getDemoChannel(client);
    }
  }, [loading]); // eslint-disable-line

  const ListHeaderWrapper = ({ children }) => {
    return (
      <>
        <div className="messaging__channel-list">
          <div className="messaging__channel-list__header">
            <Avatar image={image} name={name} size={40} />
            <div className="messaging__channel-list__header__name">
              {name || id}
            </div>

            <button
              className="messaging__channel-list__header__button"
              onClick={onCreateChannel}
            >
              <CreateChannelIcon />
            </button>
          </div>
          <div className="searchwrapper"></div>
          {children}
        </div>
      </>
    );
  };

  if (error) {
    return (
      <ListHeaderWrapper>
        <div className="messaging__channel-list__message">
          Error loading conversations, please try again momentarily.
        </div>
      </ListHeaderWrapper>
    );
  }

  if (loading) {
    return (
      <>
        <ListHeaderWrapper>
          <div className="messaging__channel-list__message">
            <SkeletonLoader />
          </div>
        </ListHeaderWrapper>
      </>
    );
  }

  return (
    <>
      <ListHeaderWrapper>{children}</ListHeaderWrapper>;
      {/* <ChannelSearch></ChannelSearch> */}
    </>
  );
};

export default React.memo(MessagingChannelList);
