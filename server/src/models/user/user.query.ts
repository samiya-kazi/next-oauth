import User from "./user.model";

export async function findUserByEmail (email: string) {
  try {
    const user = await User.findOne({ where: { email }});
    return user
  } catch (error) {
    console.error(error);
    throw new Error('Error finding user by email from DB.');
  }
}

export async function findUserById (id: number | string) {
  try {
    const user = await User.findByPk(id);
    return user
  } catch (error) {
    console.error(error);
    throw new Error('Error finding user by id from DB.');
  }
}

export async function createNewUser (data: { name: string, email: string }) {
  try {
    const user = await User.create(data);
    return user
  } catch (error) {
    console.error(error);
    throw new Error('Error creating new user in DB.');
  }
}