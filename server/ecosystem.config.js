module.exports = {
  apps: [
    {
      name: "app1",
      script: "./bin/www",
      env: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
        SESSION_SECRET: "gadpiw-1veqge-kaCcoc",
        MONGO_URL:
          "mongodb+srv://admin:2nKNOZ6rEidqojoz@cluster0.fnxafee.mongodb.net/?retryWrites=true&w=majority",
        ADMIN_KEY: "siqgas-guTdy4-womxuq",
        CLIENT_URL: "http://localhost:5173",
      },
    },
  ],
};
