import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import HelpIcon from "@mui/icons-material/Help";
import PushPinIcon from "@mui/icons-material/PushPin";
import "./ChatHeader.scss";

const ChatHeader = () => {
    return (
        <div className="chatHeader">
            <div className="chatHeaderLeft">
                <h3>
                    <span className="chatHeaderHash">#</span>
                    Test Channel
                </h3>
            </div>

            <div className="chatHeaderRight">
                <NotificationsIcon />
                <PushPinIcon />
                <PeopleAltIcon />
            <div className="chatHeaderSearch">
                <input placeholder="Search" />
                <SearchIcon />
            </div>
            <SendIcon />
            <HelpIcon />
            </div>
        </div>
    );
}

export default ChatHeader;