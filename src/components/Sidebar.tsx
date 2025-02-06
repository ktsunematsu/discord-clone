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

const styles = {
  sidebar: {
    display: "flex",
    height: "100vh",
  },
  sidebarLeft: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    backgroundColor: "#1e1f22",
    padding: "7px 15px",
  },
  serverIcon: {
    width: "60px",
    height: "60px",
    backgroundColor: "#36393f",
    borderRadius: "9999px",
    marginBottom: "10px",
    position: "relative" as const,
  },
  serverIconImg: {
    width: "50px",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  sidebarRight: {
    backgroundColor: "#2b2d31",
    width: "240px",
    position: "relative" as const,
  },
  sidebarTop: {
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
  },
  sidebarChannels: {
    padding: "13px",
  },
  sidebarChannelsHeader: {
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  sidebarAddChannel: {
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
  sidebarChannel: {
    padding: "8px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#8e9297",
    fontSize: "14px",
  },
  sidebarSettings: {
    position: "absolute" as const,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "93%",
    paddingBottom: "10px",
    borderTop: "1px solid #686a6e",
    paddingTop: "10px",
    marginLeft: "-3px",
  },
  sidebarAccount: {
    display: "flex",
    alignItems: "center",
  },
  accountImage: {
    width: "55px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  accountName: {
    marginLeft: "5px",
  },
  accountNameH4: {
    color: "white",
    fontWeight: 500,
    margin: 0,
    padding: 0,
  },
  accountNameSpan: {
    color: "#686a6e",
    fontSize: "12px",
    display: "block",
  },
  sidebarVoice: {
    display: "flex",
    gap: "12px",
    color: "#686a6e",
  },
  smallIcon: {
    width: "50px",
  },
};

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
    <div style={styles.sidebar}>
      <div style={styles.sidebarLeft}>
        <div style={styles.serverIcon}>
          <img style={styles.serverIconImg} src="/discord.png" alt="serverIcon" />
        </div>
        <div style={styles.serverIcon}>
          <img style={styles.serverIconImg} src="/discord.png" alt="serverIcon" />
        </div>
      </div>
      <div style={styles.sidebarRight}>
        <div style={styles.sidebarTop}>
          <h3>Discord</h3>
          <ExpandMoreOutlined />
        </div>

        <div style={styles.sidebarChannels}>
          <div style={styles.sidebarChannelsHeader}>
            <div style={styles.sidebarHeader}>
              <ExpandMoreOutlined />
              <h4>Text Channels</h4>
            </div>
            <AddIcon style={styles.sidebarAddChannel} onClick={() => addChannel()}/>
          </div>
          <div>
            {channels.map((channel: Channel) => (
              <SidebarChannel
                key={channel.id}
                id={channel.id}
                channel={channel}
                selected={false}
              />
            ))}
          </div>
          <div style={styles.sidebarSettings}>
            <div style={styles.sidebarAccount}>
              <img 
                src={user?.photo}
                alt="customIcon" 
                onClick={handleSignOut} 
                style={{...styles.accountImage, ...styles.smallIcon}}
              />
              <div style={styles.accountName}>
                <h4 style={styles.accountNameH4}>{user?.displayName}</h4>
                <span style={styles.accountNameSpan}>#{user?.uid.substring(0, 4)}</span>
              </div>
            </div>

            <div style={styles.sidebarVoice}>
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