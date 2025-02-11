import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  photo: string;
  email: string;
  displayName: string;
  status: 'online' | 'offline';
  lastSeen: Timestamp;
}

export interface Channel {
  id: string;
  channelName: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  type: 'text' | 'voice';
  isPrivate: boolean;
}

export interface Message {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
  isEdited: boolean;
  editedAt: Timestamp | null;
  isDeleted: boolean;
  reactions?: {
    [emoji: string]: {
      count: number;
      users: {
        [uid: string]: {
          timestamp: Timestamp;
          displayName: string;
        }
      }
    }
  };
}
