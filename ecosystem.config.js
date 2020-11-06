module.exports = {
    apps: [
      {
        name: 'achievement-analysis-com', // 项目名称
  
        // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  
        args: 'one two',
  
        instances: 1,
  
        autorestart: true,
  
        watch: false,
  
        max_memory_restart: '2G',
      },
    ],
  
    deploy: {
      production: {
        user: 'root', // 实例用户名
  
        host: '39.106.96.7', // 实例公网ip
  
        ref: 'origin/dev', // 选择项目需要配置的git分支
  
        repo: 'git@github.com:a896853205/achievement-analysis-com.git', // 项目仓库地址
  
        path: '/achievement-analysis-test/achievement-analysis-com', // 服务器项目创建目录，没有目录会自己新建
  
        'post-deploy': 'yarn && yarn build', // 配置过程
  
        'post-setup': 'yarn && yarn build', // 升级过程
      },
    },
  };