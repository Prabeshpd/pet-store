FROM node:18-bullseye-slim AS base

# Install required dependecies
FROM base as dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

# Build Application
FROM base AS builder

ENV PORT=3000 

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN yarn run prisma generate
RUN yarn build

# Application runner
FROM base AS runner

ENV NODE_ENV production

WORKDIR /app
    
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE $PORT

CMD ["node", "dist/src/server.js"]
