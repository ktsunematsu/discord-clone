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
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';


interface Message {
    message: string;
    timestamp: string;
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

const Chat = () => {
    const [inputText, setInputText] = useState<string>('');

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
    };

    useEffect(() => {
        console.log('Selected Channel:', channelName);
    }, [channelName]);

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />

            <div className="chatMessages">
                <Message />
                <Message />
                <Message />
            </div>
            
            <ChatInputContainer>
                <AddCircleOutline fontSize="large" />
                <ChatForm>
                    <input 
                    type="text"
                    placeholder={`Message #TEST`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputText(e.target.value)
                    } 
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