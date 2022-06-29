module.exports = {
  apps: [
    {
      name: 'srv_Fork_1',
      script: './app.js',
      watch: true,
      args: '8082 fork',
      autorestart: true,
    },
    {
      name: 'srv_Fork_2',
      script: './app.js',
      watch: true,
      args: '8083 fork',
      autorestart: true,
    },
    {
      name: 'srv_Fork_3',
      script: './app.js',
      watch: true,
      args: '8084 fork',
      autorestart: true,
    },
    {
      name: 'srv_Fork_3',
      script: './app.js',
      watch: true,
      args: '8085 fork',
      autorestart: true,
    },
  ],
};
