export interface IGameSession {
  user: {
    userInfo: {
      allowsWriteToPm: true;
      firstName: string;
      id: string;
      languageCode: string;
      lastName: string;
      username: string;
    };
    wallet: string;
  };
}
