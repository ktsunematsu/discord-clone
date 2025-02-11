import { db } from '../firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';


/**
 * チャンネル名を更新する
 */
export const updateChannelName = async (channelId: string, newName: string): Promise<boolean> => {
  try {
    if (!channelId) {
      throw new Error('チャンネルIDが指定されていません');
    }

    const channelRef = doc(db, 'channels', channelId);
    const channelDoc = await getDoc(channelRef);
    
    if (!channelDoc.exists()) {
      throw new Error('指定されたチャンネルが見つかりません');
    }

    const updatedAt = new Date().toISOString(); // ISO文字列形式に変換

    await updateDoc(channelRef, {
      'channel.channelName': newName,
      'updatedAt': updatedAt
    });

    console.log('チャンネル名を更新しました:', { channelId, newName, updatedAt });
    return true;
  } catch (error) {
    console.error('チャンネル名の更新エラー:', error, { channelId });
    throw error;
  }
};

/**
 * チャンネルを削除する
 */
export const deleteChannel = async (channelId: string): Promise<boolean> => {
  try {
    if (!channelId) {
      throw new Error('チャンネルIDが指定されていません');
    }

    const channelRef = doc(db, 'channels', channelId);
    const channelDoc = await getDoc(channelRef);
    
    if (!channelDoc.exists()) {
      throw new Error('指定されたチャンネルが見つかりません');
    }

    await deleteDoc(channelRef);
    console.log('チャンネルを削除しました:', channelId);
    return true;
  } catch (error) {
    console.error('チャンネル削除エラー:', error, { channelId });
    throw error;
  }
};