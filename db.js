const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ firstName: 'moe', lastName: 'smith'}),
        User.create({ firstName: 'larry', lastName: 'jones'}),
        User.create({ firstName: 'curly', lastName: 'roberts'}),
      ]);
    });
};

module.exports = {
  syncAndSeed,
  models: {
    User
  }
};
