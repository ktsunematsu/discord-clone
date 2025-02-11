import { DocumentData } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setChannelInfo } from "../features/channelSlice";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { updateChannelName, deleteChannel } from '../utils/channelOperations';  // 追加

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
    backgroundColor: "#42464d",
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
  actionButtons: {
    display: 'none',
    marginLeft: 'auto',
    gap: '8px',
  },
  actionButtonsVisible: {
    display: 'flex',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    color: '#96989d',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: 'white',
    },
  },
  editInput: {
    background: 'transparent',
    border: '1px solid #96989d',
    borderRadius: '3px',
    color: 'white',
    fontSize: '15px',
    padding: '2px 5px',
    width: '100%',
    outline: 'none',
  },
  editButtons: {
    display: 'flex',
    gap: '4px',
    marginLeft: '8px',
  },
};

const SidebarChannel = ({ id, channel, selected }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(channel.channel.channelName);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channel.channel.channelName,
      })
    );
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('このチャンネルを削除してもよろしいですか？')) {
      try {
        await deleteChannel(id);
      } catch (error) {
        alert('チャンネルの削除に失敗しました');
      }
    }
  };

  const handleSubmitEdit = async () => {
    try {
      await updateChannelName(id, editName);
      setIsEditing(false);
      dispatch(
        setChannelInfo({
          channelId: id,
          channelName: editName,
        })
      );
    } catch (error) {
      alert('チャンネル名の更新に失敗しました');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(channel.channel.channelName);
  };

  return (
    <div 
      style={{
        ...styles.sidebarChannel,
        ...(isHover ? styles.sidebarChannelHover : {}),
        ...(selected ? styles.selected : {})
      }}
      onClick={!isEditing ? handleClick : undefined}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isEditing ? (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            style={styles.editInput}
            autoFocus
          />
          <div style={styles.editButtons}>
            <button onClick={handleSubmitEdit} style={styles.iconButton}>
              <CheckIcon fontSize="small" />
            </button>
            <button onClick={handleCancelEdit} style={styles.iconButton}>
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <h4 style={{ ...styles.h4, ...(selected ? { color: "white" } : {}) }}>
            <span style={styles.sidebarChannelHash}>#</span>
            {channel.channel.channelName}
          </h4>
          <div
            style={{
              ...styles.actionButtons,
              ...(isHover ? styles.actionButtonsVisible : {})
            }}
          >
            <button
              onClick={handleEdit}
              style={styles.iconButton}
              title="チャンネル名を編集"
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              onClick={handleDelete}
              style={styles.iconButton}
              title="チャンネルを削除"
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarChannel;