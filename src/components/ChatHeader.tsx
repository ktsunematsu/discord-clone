import styled from '@emotion/styled';
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import PushPinIcon from "@mui/icons-material/PushPin";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  background-color: #2f3136;
  width: 100%;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  h3 {
    color: white;
    display: flex;
    align-items: center;
    .hash {
      color: gray;
      margin-right: 10px;
      font-size: 24px;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #7b7c85;
  gap: 15px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #40444b;
  padding: 10px;
  border-radius: 5px;
  margin-right: 20px;
  
  input {
    background: transparent;
    outline: none;
    color: white;
    border: none;
    margin-left: 5px;
  }
`;

type Props = {
    channelName: string | null;
};

const ChatHeader = ({ channelName }: Props) => {
    return (
        <Header>
            <HeaderLeft>
                <h3>
                    <span className="hash">#</span>
                    {channelName}
                </h3>
            </HeaderLeft>

            <HeaderRight>
                <NotificationsIcon />
                <PushPinIcon />
                <PeopleAltIcon />
                <SearchBar>
                    <input placeholder="Search" />
                    <SearchIcon />
                </SearchBar>
                <HelpIcon />
            </HeaderRight>
        </Header>
    );
};

export default ChatHeader;