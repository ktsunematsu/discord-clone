import './Sidebar.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { ExpandMoreOutlined, Mic, Settings } from "@mui/icons-material";
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
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
            <AddIcon className="sidebarAddChannel"/>
          </div>
          <div className="sidebarChannelsList">
            <div className="sidebarChannel">
              <span># Channel 1</span>
            </div>
            <div className="sidebarChannel">
              <span># Channel 2</span>
            </div>
            <div className="sidebarChannel">
              <span># Channel 3</span>
            </div>
          </div>
          <div className="sidebarSettings">
            <img src="./discord.png" alt="customIcon" className="customIcon smallIcon" />
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