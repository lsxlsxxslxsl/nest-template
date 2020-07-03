module.exports = {
  apps: [
    {
      name: 'upgrade-test',
      script: './dist/main.js',
      cwd: './', // 当前工作路径
      instances: 'max',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      watch: true,
      ignore_watch: ['node_modules', 'logs', 'public'],
      node_args: '--harmony', // node的启动模式
      env: {
        NODE_ENV: 'test'
      },
      out_file: './logs/output.log', // 普通日志路径
      error_file: './logs/error.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm'
    },
    {
      name: 'upgrade-prod',
      script: './dist/main.js',
      cwd: './', // 当前工作路径
      instances: 'max',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      watch: true,
      ignore_watch: ['node_modules', 'logs', 'public'],
      node_args: '--harmony', // node的启动模式
      env: {
        NODE_ENV: 'production'
      },
      out_file: './logs/output.log', // 普通日志路径
      error_file: './logs/error.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm'
    }
  ],
  // 远程部署
  deploy: {
    production: {
      // 需要配置免密登录
      user: 'root', // 服务器用户名
      host: '39.104.124.220', // 服务器地址
      port: 22, // ssh端口
      ssh_options: 'StrictHostKeyChecking=no', // SSH 公钥检查
      ref: 'origin/master', // 仓库名称
      repo: 'git@github.com:lsxlsxxslxsl/nest-template.git', // Github上的仓库地址
      path: '/var/server/production', // 应用部署到服务器的路径
      'pre-deploy': 'git fetch --all', //部署前执行
      'post-deploy': 'yarn install && yarn run build && pm2 reload pm2.config.js --only upgrade-prod', // 部署后执行
      env: {
        NODE_ENV: 'production'
      }
    },
    test: {
      user: 'root',
      host: '39.104.124.220',
      port: 22, // ssh端口
      ssh_options: 'StrictHostKeyChecking=no', // SSH 公钥检查
      ref: 'origin/master',
      repo: 'git@github.com:lsxlsxxslxsl/nest-template.git',
      path: '/var/server/test',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'yarn install && yarn run build && pm2 reload pm2.config.js --only upgrade-test',
      env: {
        NODE_ENV: 'test'
      }
    }
  }
};
