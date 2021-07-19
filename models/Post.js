const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

//-----INITIALIZE Posr-----//
Post.init(
  {
    //Id for post
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //post title
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //Array to add media
    media: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    //reference to user.id (post creator)
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post;