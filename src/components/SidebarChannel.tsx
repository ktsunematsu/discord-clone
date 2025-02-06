import { DocumentData } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setChannelInfo } from "../features/channelSlice";

type Props = {
  id: string;
  channel: DocumentData;
  selected?: boolean;
};

const styles = {
  sidebarChannel: {
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  sidebarChannelHover: {
    backgroundColor: "#2f3136",
    color: "white",
  },
  selected: {
    backgroundColor: "#393c43",
    "& h4": {
      color: "white",
    },
  },
  h4: {
    display: "flex",
    alignItems: "center",
    color: "#96989d",
    fontSize: "15px",
    margin: 0,
    padding: 0,
  },
  sidebarChannelHash: {
    fontSize: "22px",
    paddingRight: "10px",
  },
};

const SidebarChannel = ({ id, channel, selected }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channel.channel.channelName,
      })
    );
  };

  return (
    <div 
      style={{
        ...styles.sidebarChannel,
        ...(isHover ? styles.sidebarChannelHover : {}),
        ...(selected ? styles.selected : {})
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h4 style={{ ...styles.h4, ...(selected ? { color: "white" } : {}) }}>
        <span style={styles.sidebarChannelHash}>#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;