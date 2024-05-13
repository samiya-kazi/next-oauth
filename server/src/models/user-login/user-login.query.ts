import UserLogin from "./user-login.model";

export async function findUserLoginByUserID (user_id: number | string) {
  try {
    const login = await UserLogin.findOne({ where: { user_id }});
    return login;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding user login by user ID from DB.');
  }
}


export async function createUserLogin (data: { user_id: number, type: 'basic' | 'google', email: string, password?: string }) {
  try {
    const login = await UserLogin.create(data);
    return login;
  } catch (error) {
    console.error(error);
    throw new Error('Error creatinig user login in DB.');
  }
}