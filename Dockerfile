# base image
FROM node:20.10.0-alpine

LABEL org.opencontainers.image.authors="Muhammad Adeel <madeel385@gmail.com>"

# RUN apk --no-cache --update add dumb-init vim nano bash git curl && \
#     apk --no-cache --update add \
#         build-base \
#         python \
#     && rm -rf /var/cache/apk/* /tmp \
#     && mkdir /tmp \
#     && chmod 777 /tmp \
#     && yarn global add typescript nodemon concurrently


RUN apk --no-cache --update add dumb-init vim nano bash git curl && \
    apk --no-cache --update add \
        build-base \
        python3 \
    && rm -rf /var/cache/apk/* /tmp \
    && mkdir /tmp \
    && chmod 777 /tmp \
    && yarn global add typescript nodemon concurrently

# RUN apk --no-cache --update add dumb-init vim nano bash git curl && \
#     apk --no-cache --update add \
#         build-base \
#         python2 \
#         py2-pip \
#     && rm -rf /var/cache/apk/* /tmp \
#     && mkdir /tmp \
#     && chmod 777 /tmp \
#     && yarn global add typescript nodemon concurrently

# Global installs to non root owned directory and add that to path so they're executable
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:${PATH}"

ARG application_dir=.

# Set the application directory
WORKDIR /ips/

RUN chown node:node /ips/

# Add all the files needed for yarn install
ADD --chown=node:node $application_dir/package.json \
    $application_dir/yarn.lock \
    /ips/

# Switch to non-root user and install dependencies
USER node

RUN yarn install

# Add files to the container, perform chmod and chown
ADD --chown=node:node $application_dir /ips/

RUN npm run build:prod
