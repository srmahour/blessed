FROM node:lts as dependencies
WORKDIR /bfs
COPY package.json .npmrc ./
RUN yarn install --frozen-lockfile



ENV PORT 4333
ENV NODE_ENV production
ENV DD_ENV production
ENV DD_LOGS_INJECTION true
ENV DD_TRACE_SAMPLE_RATE '1'
ENV NEXT_PUBLIC_BFS_API https://bfs-dev.xyz/api

FROM node:lts as builder
WORKDIR /bfs
COPY . .
COPY --from=dependencies /bfs/node_modules ./node_modules
RUN yarn run docker-build

FROM node:lts as runner
WORKDIR /bfs

# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /bfs/public ./public
COPY --from=builder /bfs/pages ./pages
COPY --from=builder /bfs/styles ./styles
COPY --from=builder /bfs/store ./store
COPY --from=builder /bfs/ext ./ext
COPY --from=builder /bfs/lib ./lib
COPY --from=builder /bfs/utils ./utils
COPY --from=builder /bfs/.next ./.next
COPY --from=builder /bfs/node_modules ./node_modules
COPY --from=builder /bfs/package.json ./package.json
COPY --from=builder /bfs/server.js ./server.js
COPY --from=builder /bfs/tsconfig.json ./tsconfig.json
COPY --from=builder /bfs/next.config.js ./next.config.js
COPY --from=builder /bfs/next-i18next.config.js ./next-i18next.config.js

EXPOSE 4333

CMD ["yarn","run", "d-start"]