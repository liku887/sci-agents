# ----------------
# 安装依赖阶段
# ----------------
FROM node:22-alpine AS deps
WORKDIR /app

# 只复制 package.json 和 package-lock.json 提高缓存效率
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install --legacy-peer-deps

# ----------------
# 构建阶段
# ----------------
FROM deps AS builder
WORKDIR /app

# 复制项目源码
COPY . .

# 复制环境变量文件
COPY .env.local .env

# 设置生产环境，确保构建为生产模式
ENV NODE_ENV=production

# 构建 Next.js（生成 .next/standalone）
RUN npm run build

# ----------------
# 运行阶段
# ----------------
FROM node:22-alpine AS runner
WORKDIR /app

# 复制 standalone 文件夹（包含 server.js 和运行依赖）
COPY --from=builder /app/.next/standalone ./

# 复制静态资源
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 设置运行环境
ENV NODE_ENV=local

# 开放端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["node", "server.js"]
