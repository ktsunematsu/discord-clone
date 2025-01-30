import { DocumentData } from "firebase/firestore/lite";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import { setChannelInfo } from "../features/channelSlice";
import "./SidebarChannel.scss";

type Props = {
  id: string;
  channel: DocumentData;
};

const SidebarChannel = ({ id, channel }: Props) => {
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
    <div className="sidebarChannel" onClick={handleClick}>
      <h4>
        <span className="sidebarChannelHash">#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;