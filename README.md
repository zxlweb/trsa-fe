# XNL-React-Boilerplate

React前端项目解决方案，采用React和Redux架构，服务器端渲染，使用gulp和webpack进行构建。  
笑年郎数字科技出品。  

## 目录
1. 概述
2. 安装
3. 上手
4. 本地开发与调试
5. [部署](#部署)

## 部署

### 部署到CentOS 6.5 x64

1. 本地生成ssh keys并复制到目标服务器

 ```bash
 ssh-keygen -t rsa
 ssh-copy-id root@server.com
 // 没有ssh-copy-id的话，请先 brew install ssh-copy-id
 ```

2. ssh到目标服务器, 之后的操作是在服务器上进行

 `ssh root@server.com`

3. 安装nvm（不建议单独安装node和npm，不方便升级和管理）

 `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash`  
 启用nvm  
 `. ~/.nvm/nvm.sh`

4. 安装io.js-v2.1.0 （暂时只测试到这个版本，更高版本无法保证安装和运行正确）

 `nvm install iojs-v2.1`  
 设置iojs为默认项
 `nvm alias default iojs-v2.1`  
 启用iojs-v2.1
 `nvm use default`  

 这个时候可以通过`node -v`，`npm -v`来检查是否安装正确

5. 全局安装pm2, gulp

 `npm i -g pm2 gulp`  
 启用pm2
 `pm2 startup centos`

6. 安装可能缺少的库

 缺少该库会导致压缩图片无法正常运行
 `yum install libpng-devel`

7. 断开ssh，切换回本地，配置项目中的ecosystem.json5文件

 根据不同项目，自行修改加了注释的参数
 ```
 {
   apps: [
     {
       name: "template",// 项目名称
       script: "dist/framework/server/server.js",
       env: {
         NODE_ENV: "production"
       }
     },
   ],
   deploy : {
     production : {
       user : "root",// ssh 用户名
       host : "xiaonian.me",// 目标服务器
       ref  : "origin/master",
       repo : "https://github.com/MaxLee1994/XNL-React-Boilerplate.git",// git版本库
       path : "/usr/local/nginx/html/XNL-React-Boilerplate",// 项目在目标服务器上的地址
       "post-deploy" : "cd view && npm i && gulp && pm2 startOrRestart ecosystem.json5"
     }
   }
 }
 ```

8. 部署准备

 进到ecosystem.json5同级目录
 `pm2 deploy ecosystem.json5 production setup`

9. 第一次部署

 `pm2 deploy production`  
 第一次部署因为会下载全部的node_modules会花较长时间，之后增量部署时间就会大幅缩短

10. 增量部署

 假设现在有新的变更  
 ```bash
 git push origin master
 pm2 deploy production // 一行代码搞定部署
 ```
