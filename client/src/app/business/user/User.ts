
export interface IUser {
  last_name?: string;
  first_name?: string;
  title?: string;
  email?: string;
  mobile_phone_number?: string;
  phone_number?: string;
  activated?: boolean;
  activation_date?: Date;
  desactivation_date?: Date;
  last_connection?: Date;
  id?: string;
  token?: string;
}
