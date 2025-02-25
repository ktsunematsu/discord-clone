export interface InitialUserState {
    user: null | {
      uid: string;
      photo: string;
      email: string;
      displayName: string;
    };
  }
  
  export interface InitialAppState {
    channelId: string | null;
    channelName: string | null;
  }

  export interface InitialChannelState {
    channelId: string | null;
    channelName: string | null;
  }