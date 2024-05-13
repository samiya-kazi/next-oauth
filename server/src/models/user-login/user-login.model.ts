import { Model, DataTypes, Optional } from 'sequelize';
import { IUserLogin } from '../../interfaces/user-login.interface';
import sequelize from '..';

interface UserLoginCreationAttributes extends Optional<IUserLogin, 'id'> {};

interface UserLoginInstance extends Model<IUserLogin, UserLoginCreationAttributes>, IUserLogin {
  createdAt?: Date;
  updatedAt?: Date;
}

const UserLogin = sequelize.define<UserLoginInstance>('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM('basic', 'google'),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true
  },
})


export default UserLogin;