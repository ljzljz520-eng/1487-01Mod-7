FROM node:18-alpine

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 运行 lint 检查
RUN npm run lint

# 暴露端口（如果需要的话）
EXPOSE 3000

# 默认命令
CMD ["npm", "run", "dev"]