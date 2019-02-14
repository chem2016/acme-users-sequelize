const db = require('./db');
const app = require('./app');
const port = process.env.PORT || 3000;
db.syncAndSeed()
  .then(()=> app.listen(port, ()=> `listening on port ${port}`)); 
