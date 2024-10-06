export default {
    jwt: {
      secret: process.env.APP_SECRET || 'default_secret_key',
      expiresIn: '12h',
    }
  };
  