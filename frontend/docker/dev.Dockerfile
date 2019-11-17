FROM node:10-slim

# https://stackoverflow.com/questions/54248678/which-are-the-differences-between-vue-cli-and-vue-cli-service
RUN npm install @vue/cli -g && npm install @vue/cli-service-global -g

WORKDIR /usr/src/app

RUN apt-get autoremove -y \
    && apt-get autoclean -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Or just use EXPORT 8080
# EXPOSE ${YOUR_APP_WEB_HTTP_PORT}
EXPOSE 8080
# If yout want use vue-cli UI you need to also EXPORT 8000 
EXPOSE 8000
VOLUME ["/usr/src/app"]

USER node

# switch to npm if you chose it as package manager
CMD ["npm", "run", "dev"]
