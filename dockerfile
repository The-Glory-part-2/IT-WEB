FROM node:14
LABEL email="brstar96@naver.com"
LABEL name="MYEONGGYULEE"
LABEL version="1.0"
LABEL description="mgl_blog"

# create workdir
RUN mkdir -p /app
WORKDIR /app
ADD ./ /app

# setup dependencies
RUN npm install
COPY . .

# set NODE_ENV to 'development'
ENV NODE_ENV development

# 컨테이너 실행 시 npm start 실행
CMD [ "npm", "start" ]