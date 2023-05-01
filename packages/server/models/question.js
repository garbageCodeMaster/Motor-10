import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

import { Answer, Quiz } from "./index.js";

const Question = sequelize.define('question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "question_id"
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "image_url"
  }
}, {
  tableName: "questions"
});

//Question.hasMany(QuestionAttempt);

export default Question;
