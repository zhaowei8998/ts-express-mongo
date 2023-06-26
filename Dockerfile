FROM ubuntu:22.04

# 更换源
RUN sed -i 's@http://archive.ubuntu.com/ubuntu/@http://mirrors.aliyun.com/ubuntu/@g' /etc/apt/sources.list

RUN apt update

# 调节时区
ENV DEBIAN_FRONTEND=noninteractive
RUN apt install -y tzdata \
    && ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN apt install -y curl sudo samba build-essential net-tools openssh-server zsh git
RUN touch ~/.zshrc

# 安装ZSH
# RUN apt install -y git zsh \
#     && git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh \
#     && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
#     && awk '{sub(/robbyrussell/, "ys")}1' ~/.zshrc > ~/.zshrc_temp && mv ~/.zshrc_temp ~/.zshrc \
#     && git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions \
#     && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting \
#     && sed -i "s/plugins=(git.*)$/plugins=(git zsh-syntax-highlighting zsh-autosuggestions)/" ~/.zshrc
# 安装ZSH
RUN bash -c "$(curl -fsSL https://gitee.com/pocmon/ohmyzsh/raw/master/tools/install.sh)" && \
    sed -i "s/plugins=(git.*)$/plugins=(git zsh-syntax-highlighting zsh-autosuggestions)/" ~/.zshrc

# 安装ssh
# RUN sudo apt install -y net-tools openssh-server

# 安装vim
RUN sudo apt install -y vim \
    && echo "set nu" >> ~/.vimrc

# 安装Samba
# RUN sudo apt-get install -y samba

# 安装C/C++基础环境
# RUN sudo apt-get install -y build-essential

# 清除apt缓存
RUN sudo apt autoremove \
    && sudo apt clean -y \
    && sudo rm -rf /var/lib/apt/lists/*

# EXPOSE 22
# ENTRYPOINT ["/bin/zsh"]

# 复制代码
COPY . /app
# 设置容器启动后的默认运行目录
WORKDIR /app


# 运行命令，安装依赖 在docker build的过程中执行的，构建运行环境
# RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
# 例如 RUN npm install && cd /app && mkdir logs
# RUN npm install -g ts-node --registry=https://registry.npm.taobao.org && npm install -g typescript --registry=https://registry.npm.taobao.org&& npm install --registry=https://registry.npm.taobao.org

#docker构建完毕，执行服务
# CMD npm run dev
