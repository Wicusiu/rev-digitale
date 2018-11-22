
export interface IUser {
  username?: string;
  lastName?: string;
  firstName?: string;
  title?: string;
  email?: string;
  mobilePhoneNumber?: string;
  phoneNumber?: string;
  activated?: boolean;
  activationDate?: Date;
  desactivationDate?: Date;
  lastConnection?: Date;
  id?: string;
  token?: string;
}
