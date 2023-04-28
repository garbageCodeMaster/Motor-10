import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const QuizAttempt = sequelize.define('QuizAttempt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'completed_at',
  },
});
  
//QuizAttempt.belongsTo(Quiz);
//QuizAttempt.belongsTo(User);
