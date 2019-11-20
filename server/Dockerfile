FROM 249985401325.dkr.ecr.us-east-1.amazonaws.com/ci:10.13-node-alpine AS base
LABEL maintainer "lior@genesort.com"

ARG buildnum
ARG tag_name
ARG staging
ARG PORT
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ENV NODE_ENV $staging

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY config ./config

# ---- Dependencies ----
FROM base AS dependencies
COPY . .
# install node packages
RUN npm set progress=false && npm install --production
RUN npm set unsafe-perm true
RUN npm run symlink
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules


# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# copy app sources
COPY . .
CMD ["npm", "start", "-s"]


# ---- Development ----
FROM release AS dev
RUN npm install


ENV PORT 10211
ENV BUILDNUM $buildnum
ENV TAG_NAME $tag_name
ENV POSTGRES_DB $POSTGRES_DB
ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PASSWORD $POSTGRES_PASSWORD
ENV POSTGRES_HOST $POSTGRES_HOST
ENV POSTGRES_PORT $POSTGRES_PORT

EXPOSE $PORT

CMD ["npm", "start", "-s"]
