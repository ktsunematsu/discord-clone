import { config } from 'dotenv';
config();  // 環境変数をロード

import { db } from '../firebase.js';
import { collection, getDocs, writeBatch, doc, serverTimestamp } from 'firebase/firestore';

const migrateDatabase = async () => {
  if (!process.env.VITE_FIREBASE_API_KEY) {
    throw new Error('環境変数が設定されていません');
  }

  const batch = writeBatch(db);

  try {
    console.log('データベースの移行を開始します...');

    // ユーザーデータの更新
    console.log('ユーザーデータを更新中...');
    const usersSnapshot = await getDocs(collection(db, 'users'));
    usersSnapshot.forEach((userDoc) => {
      const userRef = doc(db, 'users', userDoc.id);
      batch.update(userRef, {
        status: 'offline',
        lastSeen: serverTimestamp()
      });
    });
    console.log(`${usersSnapshot.size}件のユーザーデータを更新しました`);

    // チャンネルデータの更新
    console.log('チャンネルデータを更新中...');
    const channelsSnapshot = await getDocs(collection(db, 'channels'));
    channelsSnapshot.forEach((channelDoc) => {
      const channelRef = doc(db, 'channels', channelDoc.id);
      batch.update(channelRef, {
        description: 'メインチャンネル',
        createdAt: serverTimestamp(),
        type: 'text',
        isPrivate: false
      });
    });
    console.log(`${channelsSnapshot.size}件のチャンネルデータを更新しました`);

    await batch.commit();
    console.log('データベースの移行が完了しました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
};

const migrateMessages = async () => {
  const batch = writeBatch(db);

  try {
    console.log('メッセージの更新を開始します...');
    
    // すべてのチャンネルを取得
    const channelsSnapshot = await getDocs(collection(db, 'channels'));
    
    for (const channelDoc of channelsSnapshot.docs) {
      // 各チャンネルのメッセージを取得
      const messagesSnapshot = await getDocs(collection(db, 'channels', channelDoc.id, 'messages'));
      
      messagesSnapshot.forEach((messageDoc) => {
        const messageRef = doc(db, 'channels', channelDoc.id, 'messages', messageDoc.id);
        
        // メッセージを更新
        batch.update(messageRef, {
          isEdited: false,
          editedAt: null,
          isDeleted: false,
          reactions: {}
        });
      });
    }

    await batch.commit();
    console.log('メッセージの更新が完了しました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
};

// 即時実行
(async () => {
  try {
    await migrateDatabase();
    await migrateMessages();
  } catch (error) {
    console.error('予期せぬエラーが発生しました:', error);
    process.exit(1);
  }
})();