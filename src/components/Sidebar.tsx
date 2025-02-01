import './Sidebar.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { ExpandMoreOutlined, Mic, Settings } from "@mui/icons-material";
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth } from '../firebase';
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/userSlice";
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { useState, useEffect } from 'react';
import SidebarChannel from './SidebarChannel';
import { useFirebase} from '../hooks/useFirebase';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Channel {
  id: string;
  channel: {
    channelName: string;
  };
}

const Sidebar = () => {
  const { documents: channels } = useFirebase("channels");
  console.log(channels);
  const user = useAppSelector((state: RootState) => state.user.user);
  
  const addChannel = async () => {
    const channelName = prompt("Enter the channel name");
    if (channelName) {
      const docRef = await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
      console.log("Document written with ID: ", docRef.id);
    }
  };

  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <div className="sidebar">
      {/* sidebarLeft */}
      <div className="sidebarLeft">
        {/* discordIcon */}
        <div className="serverIcon">
          <img src="/discord.png" alt="serverIcon" />
        </div>
        <div className="serverIcon">
          <img src="/discord.png" alt="serverIcon" />
        </div>
      </div>
      {/* sidebarRight */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreOutlined />
        </div>

        {/* sidebarChannels */}
        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreOutlined />
              <h4>Text Channels</h4>
            </div>
            <AddIcon className="sidebarAddChannel" onClick={() => addChannel()}/>
          </div>
          <div className="sidebarChannelsList">
            {channels.map((channel: Channel) => (
              <SidebarChannel
                key={channel.id}
                id={channel.id}
                channel={channel}
              />
            ))}
          </div>
          <div className="sidebarSettings">
              <div className="sidebarAccount">
                <img 
                  src={user?.photo}
                  alt="customIcon" 
                  onClick={handleSignOut} 
                  className="customIcon smallIcon" 
                />
                <div className="accountName">
                  <h4>{user?.displayName}</h4>
                  <span>#{user?.uid.substring(0, 4)}</span>
                </div>
              </div>

              <div className="sidebarVoice">
                <MicIcon />
                <HeadphonesIcon />
                <SettingsIcon />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;