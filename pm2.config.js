module.exports = {
  apps: [
    {
      name: 'upgrade',
      script: './main.js',
      cwd: './', // 当前工作路径
      instances: 'max',
      exec_mode: 'cluster',
      watch: true,
      ignore_watch: ['node_modules', 'logs', 'public'],
      node_args: '--harmony', // node的启动模式
      env: {
        PORT: 8001,
        NODE_ENV: 'test',
      },
      env_production: {
        PORT: 8002,
        NODE_ENV: 'production',
      },
      out_file: './logs/output.log', // 普通日志路径
      error_file: './logs/error.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm z',
    },
  ],
  // 远程部署
  deploy: {
    production: {
      // 需要配置免密登录
      user: 'root', // 服务器用户名
      host: 'xxx.xxx.xxx.xxx', // 服务器地址
      port: 22, // ssh端口
      ref: 'origin/master', // 仓库名称
      repo: 'git@github.com:xxx/xxx.git', // Github上的仓库地址
      path: '/var/server/production', // 应用部署到服务器的路径
      'pre-deploy': 'git fetch --all', //部署前执行
      'post-deploy': 'npm install && pm2 reload pm2.config.js --env production', // 部署后执行
    },
    test: {
      user: 'root',
      host: 'xxx.xxx.xxx.xxx',
      port: 22, // ssh端口
      ref: 'origin/master',
      repo: 'git@github.com:xxx/xxx..git',
      path: '/var/server/test',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm install && pm2 reload pm2.config.js --env test',
      env: {
        NODE_ENV: 'test',
      },
    },
  },
};
