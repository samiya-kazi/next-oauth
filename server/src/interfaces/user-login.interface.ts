export interface IUserLogin {
  id: number;
  type: "basic" | "google";
  user_id: number;
  email: string;
  password?: string;
}