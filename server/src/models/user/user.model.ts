import { Model, DataTypes, Optional } from 'sequelize';
import { IUser } from '../../interfaces/user.interface';
import sequelize from '..';
import UserLogin from '../user-login/user-login.model';

interface UserCreationAttributes extends Optional<IUser, 'id'> {};

interface UserInstance extends Model<IUser, UserCreationAttributes>, IUser {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

User.hasOne(UserLogin, {
  sourceKey: 'id',
  foreignKey: 'user_id',
});

UserLogin.belongsTo(User, {
  foreignKey: 'user_id',
})


export default User;