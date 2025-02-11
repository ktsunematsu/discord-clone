import { db } from '../firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

// チャンネルの型定義
interface Channel {
  channelName: string;
  isDefault?: boolean;
}

interface ChannelData {
  channel: Channel;
  updatedAt: string;
}

// チャンネル名のバリデーション
const validateChannelName = (name: string): boolean => {
  if (name.length < 2 || name.length > 32) return false;
  const pattern = /^[a-zA-Z0-9_-]+$/;
  return pattern.test(name);
};

/**
 * チャンネル名を更新する
 */
export const updateChannelName = async (channelId: string, newName: string): Promise<boolean> => {
  try {
    if (!validateChannelName(newName)) {
      throw new Error('無効なチャンネル名です（2〜32文字の英数字、ハイフン、アンダースコアのみ使用可能）');
    }

    const channelRef = doc(db, 'channels', channelId);
    const channelDoc = await getDoc(channelRef);
    
    if (!channelDoc.exists()) {
      throw new Error('指定されたチャンネルが見つかりません');
    }

    await updateDoc(channelRef, {
      'channelName': newName,
      'updatedAt': new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('チャンネル名の更新エラー:', error);
    throw error;
  }
};

/**
 * チャンネルを削除する
 */
export const deleteChannel = async (channelId: string): Promise<boolean> => {
  try {
    const channelRef = doc(db, 'channels', channelId);
    const channelDoc = await getDoc(channelRef);
    
    if (!channelDoc.exists()) {
      throw new Error('指定されたチャンネルが見つかりません');
    }

    const channelData = channelDoc.data() as ChannelData;
    if (channelData.channel.isDefault) {
      throw new Error('デフォルトチャンネルは削除できません');
    }

    await deleteDoc(channelRef);
    return true;
  } catch (error) {
    console.error('チャンネル削除エラー:', error);
    throw error;
  }
};