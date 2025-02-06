import { Avatar } from "@mui/material";
import { FieldValue, Timestamp } from "firebase/firestore";
import React from "react";

type Props = {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const styles = {
  message: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    color: "white",
    marginBottom: "-15px",
  },
  messageInfo: {
    padding: "20px 20px 20px 10px",
  },
  messageTimestamp: {
    color: "#7b7c85",
    marginLeft: "20px",
    fontSize: "16px",
  }
};

const Message = (props: Props) => {
  const { message, timestamp, user } = props;

  return (
    <div style={styles.message}>
      <Avatar src={user?.photo} />
      <div style={styles.messageInfo}>
        <h4>
          {user?.displayName}
          <span style={styles.messageTimestamp}>
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;