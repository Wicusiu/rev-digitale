import * as jwtDecode from 'jwt-decode';
import { isEmpty } from 'common/utils';

export const checkValidity = (token : string) : boolean => {
  if (isEmpty(token)) {
    return false ;
  }
  const decodedToken = jwtDecode(token) ;
  return decodedToken.exp >= Date.now().valueOf() / 1000; // to get the plain UTC time (UTC is the same format as the 'exp' from the JWT-Token)
};

export const checkAccessSecuredData = (token : string) : boolean => {
  if (isEmpty(token)) {
    return false ;
  }
  const decodedToken = jwtDecode(token) ;
  return decodedToken.exp >= Date.now().valueOf() / 1000 && decodedToken.accessSecuredData;
};
