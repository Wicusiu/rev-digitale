
export interface IUser {
  username?: string;
  last_name?: string;
  first_name?: string;
  title?: string;
  email?: string;
  mobile_number?: string;
  phone_number?: string;
  photo?: string;
  activated?: boolean;
  activation_date?: Date;
  desactivation_date?: Date;
  lastConnection?: Date;
  id?: string;
  token?: string;
  is_admin?: boolean;
}
