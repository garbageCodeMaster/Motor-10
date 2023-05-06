import Quiz from './quiz.js'
import Answer from './answer.js'
import Question from './question.js'
import User from './user.js'


Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.hasMany(Answer, { foreignKey: 'question_id' });

Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

export { Quiz, Answer, Question, User };
