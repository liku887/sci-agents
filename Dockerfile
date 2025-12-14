# ----------------
# 安装依赖阶段
# ----------------
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ----------------
# 构建阶段
# ----------------
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable pnpm
COPY . .

# ===> 添加 CI 环境变量以允许 pnpm 非交互式运行 <===
ENV CI=true

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
RUN pnpm run build

# ----------------
# 运行阶段
# ----------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
