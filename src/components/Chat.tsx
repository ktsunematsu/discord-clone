import React from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { AddCircleOutline, CardGiftcard, GifBoxOutlined, EmojiEmotions, MessageSharp } from '@mui/icons-material';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

interface Message {
    message: string;
    timestamp: string;
    user: string;
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
    //const channelName = useAppSelector((state: RootState) => state.channel.channelName);
    
    return (
        <div className="chat">
            <ChatHeader channelName="Test Channel Name" />

            <div className="chatMessages">
                <Message />
                <Message />
                <Message />
            </div>
            
            <ChatInputContainer>
                <AddCircleOutline fontSize="large" />
                <ChatForm>
                    <input placeholder={`Message #TEST`} />
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