FROM node:18
# 复制代码
COPY . /app
# 设置容器启动后的默认运行目录
WORKDIR /app


# 运行命令，安装依赖 在docker build的过程中执行的，构建运行环境
# RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
# 例如 RUN npm install && cd /app && mkdir logs
RUN npm install -g ts-node --registry=https://registry.npm.taobao.org && npm install -g typescript --registry=https://registry.npm.taobao.org&& npm install --registry=https://registry.npm.taobao.org

#docker构建完毕，执行服务
CMD npm run dev
