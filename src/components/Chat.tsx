import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { AddCircleOutline, CardGiftcard, GifBoxOutlined, EmojiEmotions } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, Timestamp, getDocs, limit } from 'firebase/firestore';
import { setChannelInfo } from '../features/channelSlice';
import SendIcon from "@mui/icons-material/Send";

interface Messages {
    message: string;
    timestamp: Timestamp;
    user: {
        uid: string;
        photo: string;
        email: string;
        displayName: string;
    };
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #36393f;
  height: 100vh;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px 20px;
  gap: 10px;
  width: auto;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #dcddde;
  align-self: flex-start;

  .messageInfo {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-start;

    .timestamp {
      color: #72767d;
      font-size: 12px;
    }
  }

  .messageText {
    text-align: left;
  }
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
  margin: 20px;
  background-color: #474b53;

  form {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  input {
    flex: 1;
    padding: 15px;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: large;
  }

  .sendIcon {
    color: #b9bbbe;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
`;

const ChatInputIcons = styled.div`
  display: flex;
  gap: 5px;
  color: #b9bbbe;
  .MuiSvgIcon-root {
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
`;

const PlusIcon = styled(AddCircleOutline)`
  color: #b9bbbe;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const Chat = () => {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const channelName = useAppSelector((state: RootState) => state.channel.channelName);
    const channelId = useAppSelector((state: RootState) => state.channel.channelId);
    const user = useAppSelector((state) => state.user.user);

    useEffect(() => {
        const setDefaultChannel = async () => {
            if (!channelId) {
                try {
                    const channelsRef = collection(db, 'channels');
                    const q = query(channelsRef, limit(1));
                    const querySnapshot = await getDocs(q);
                    
                    if (!querySnapshot.empty) {
                        const defaultChannel = querySnapshot.docs[0];
                        dispatch(
                            setChannelInfo({
                                channelId: defaultChannel.id,
                                channelName: defaultChannel.data().channelName,
                            })
                        );
                    }
                } catch (error) {
                    console.error('Default channel fetch error:', error);
                }
            }
        };

        setDefaultChannel();
    }, [channelId, dispatch]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputText.trim() && channelId) {
            try {
                await addDoc(collection(db, 'channels', channelId, 'messages'), {
                    timestamp: serverTimestamp(),
                    message: inputText,
                    user: user
                });
                setInputText('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
        setInputText('');
    };

    useEffect(() => {
        const collectionRef = collection(
            db,
            'channels',
            String(channelId),
            'messages'
        );

        const collectionRefOrderBy = query(
            collectionRef,
            orderBy('timestamp', 'asc')
        );

        onSnapshot(collectionRefOrderBy, (snapshot) => {
            const results: Messages[] = [];
            snapshot.docs.forEach((doc) => {
                results.push({
                    timestamp: doc.data().timestamp,
                    message: doc.data().message,
                    user: doc.data().user,
                });
            });
            setMessages(results);
            console.log('Messages:', results);
        });
    }, [channelId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <ChatContainer>
            <ChatHeader channelName={channelName} />
            <ChatMessages>
                {messages.map((message, index) => (
                    <MessageContainer key={index}>
                        <UserAvatar src={message.user.photo} alt={message.user.displayName} />
                        <MessageContent>
                            <div className="messageInfo">
                                <span>{message.user.displayName}</span>
                                <span className="timestamp">
                                    {message.timestamp?.toDate().toLocaleString('ja-JP', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    }).replace(/\//g, '/')}
                                </span>
                            </div>
                            <div className="messageText">{message.message}</div>
                        </MessageContent>
                    </MessageContainer>
                ))}
                <div ref={messagesEndRef} />
            </ChatMessages>
            <ChatInput>
                <PlusIcon />
                <form onSubmit={sendMessage}>
                    <input
                        placeholder={`#${channelName}へメッセージを送信`}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </form>
                <ChatInputIcons>
                    <CardGiftcard />
                    <GifBoxOutlined />
                    <EmojiEmotions />
                </ChatInputIcons>
            </ChatInput>
        </ChatContainer>
    );
};

export default Chat;