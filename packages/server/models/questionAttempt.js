import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

const QuestionAttempt = sequelize.define('questionAttempt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
});

//QuestionAttempt.belongsTo(QuizAttempt);
//QuestionAttempt.belongsTo(Question);
