import React, { useEffect } from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { AddCircleOutline, CardGiftcard, GifBoxOutlined, EmojiEmotions, MessageSharp } from '@mui/icons-material';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Input } from '@mui/material';
import { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, onSnapshot, Timestamp, query, orderBy } from 'firebase/firestore';

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

const ChatInputContainer = styled.div`
    color: lightgray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-radius: 5px;
    margin: 20px;
    background-color: #474b53;
`;

const ChatForm = styled.form`
    flex: 1;
    input {
        padding: 15px;
        background: transparent;
        border: none;
        outline-width: 0;
        color: white;
        font-size: large;
        width: 100%;
    }
`;

const ChatInputIcons = styled.div`
    display: flex;
    .MuiSvgIcon-root {
        padding: 5px;
    }
`;

// styled-componentsの定義を追加
const ChatMessagesContainer = styled.div`
    flex: 1;
    overflow-y: scroll;
    max-height: calc(100vh - 190px); // ヘッダーと入力欄の高さを考慮
    padding: 20px;

    /* スクロールバーのスタイリング */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #2f3136;
    }

    ::-webkit-scrollbar-thumb {
        background: #202225;
        border-radius: 4px;
    }
`;

const Chat = () => {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [inputText, setInputText] = useState<string>("");

    const channelName = useAppSelector((state: RootState) => state.channel.channelName);
    const channelId = useAppSelector((state: RootState) => state.channel.channelId);
    const user = useAppSelector((state: RootState) => state.user.user);
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
        let collectionRef = collection(
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
            let results: Messages[] = [];
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

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />

            <ChatMessagesContainer>
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        message={message.message}
                        timestamp={message.timestamp}
                        user={message.user}
                    />
                ))}
            </ChatMessagesContainer>
            
            <ChatInputContainer>
                <AddCircleOutline fontSize="large" />
                <ChatForm>
                    <input 
                    type="text"
                    placeholder={`Message #TEST`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputText(e.target.value)
                    }
                    value={inputText} 
                />
                <button 
                    type="submit"
                    className="chatInputButton"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        sendMessage(e)
                    }
                >
                    Send Message
                </button>
                </ChatForm>
                <ChatInputIcons>
                    <CardGiftcard />
                    <GifBoxOutlined />
                    <EmojiEmotions />
                </ChatInputIcons>
            </ChatInputContainer>
        </div>
    );
};


export default Chat;