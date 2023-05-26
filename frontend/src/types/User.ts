export interface IUser {
  _id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  payment_type: string;
  payment_card: string;
  createdAt: Date;
}
