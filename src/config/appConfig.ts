interface IAppConfig {
  port: string;
  host: string;
  auth: {
    saltRounds: string;
  };
}

export const appConfig: IAppConfig = {
  port: process.env.PORT || '3000',
  host: process.env.HOST || 'localhost',
  auth: {
    saltRounds: '11'
  }
};
