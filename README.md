### Local Deployment Instruction
1. Install npm dependencies
```
npm -i -g nodemon
```
```
cd client
npm install
```
```
cd server
npm install
```
2. Run frontend server (set to localhost:3001 in client/package.json)
```
cd client
npm start
```
3. Run backend server (set to localhost:3000 in config file: server/development.config.js)
```
cd server
nodemon start
```
### Tech Stack
Frontend: [Create React App](https://create-react-app.dev/docs/deployment)
Backend: [Node.js](https://nodejs.org/en/download/) + [Express.js](https://expressjs.com/en/starter/installing.html)
Database: [MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/)

### Team Member
qiusili@usc.edu
kunpeng@usc.edu
ruoxijia@usc.edu
yichunlu@usc.edu
