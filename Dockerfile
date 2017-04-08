FROM registry.cn-shanghai.aliyuncs.com/njxes/docker-fe:1.0

ENV NODE_ENV production
WORKDIR /workspace
COPY node_modules node_modules
COPY conf conf
COPY dist dist

EXPOSE 9999
CMD ["pm2-docker", "dist/framework/server/server.js"]
