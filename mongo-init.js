db = db.getSiblingDB('todolist');
// get .env variables
const appUser = process.env.APP_USER;
const appPassword = process.env.APP_PASSWORD;

db.createUser({
  user: appUser,
  pwd: appPassword,
  roles: [
    {
      role: 'readWrite',
      db: 'todolist'
    }
  ]
});

db.createCollection('todos');