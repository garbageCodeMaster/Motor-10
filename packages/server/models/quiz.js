import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

import { Question } from './index.js'

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'quiz_id',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  timeLimit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'time_limit',
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'point_value',
  },
  imageUrl: {
    type: DataTypes.TEXT,
    field: 'image_url',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'created_by',
  },
},
{
  tableName: "quizzes"
});

//Quiz.hasMany(Question);

export default Quiz;
