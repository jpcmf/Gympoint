import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Plan from '../app/models/Plan';
import File from '../app/models/File';
import Checkin from '../app/models/Checkin';
import Student from '../app/models/Student';
import HelpOrder from '../app/models/HelpOrder';
import Registration from '../app/models/Registration';

const models = [User, Student, Plan, Registration, Checkin, HelpOrder, File];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gympoint',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
