import * as React from 'react';
import * as moment from 'moment';

const IBAN = require('iban');

const noEmptyValidator = (message: string) => value => value ? undefined : message;

const emailValidator = (required: boolean, message?: string) => (email: string): string => {
  if (required && !email) {
    return message || 'Vous devez entrer une adresse e-mail';
  }
  if (!required && !email) {
    return undefined;
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'Le format de l\'adresse email est invalide';
  }
  return undefined;
};

const passwordValidator = (password: string, allValues: any): any => {
  // return undefined;
  const message = (<>
    <span>{'Vous devez entrer au moins 8 caractères comportant au moins 3 critères suivants :'}</span>
    <ul>
      <li key={'maj'}>{'une majuscule,'}</li>
      <li key={'min'}>{'une minuscule,'}</li>
      <li key={'chi'}>{'un chiffre,'}</li>
      <li key={'nan'}>{'un non-alphanumérique'}</li>
    </ul>
  </>);

  if (!password) {
    return message;
  }
  if (password.length < 8) {
    return message;
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  if (+hasUpperCase + +hasLowerCase + +hasNumbers + +hasNonalphas < 3) {
    return message;
  }

  return undefined;
};

const dateValidator = (maxDate?: Date) => (date: string): string => {
  if (!date || date.replace(/\s/g, '').length !== 10) {
    return 'Vous devez entrer une date au forrmat DD/MM/YYYY';
  }
  if (!moment(date, 'DD/MM/YYYY').isValid()) {
    return 'Le format de votre date est invalide (DD/MM/YYYY)';
  }
  if (maxDate && moment(date, 'DD/MM/YYYY') > moment(maxDate)) {
    return `La date doit être antérieure à ${moment(maxDate).format('DD/MM/YYYY')}`;
  }
  return undefined;
};

const validityDateValidator = (message: string) => (dateValidity: string): string => {
  if (!dateValidity) {
    return message;
  }
  if (!/^^[0-9]{2}\/{1}[0-9]{2}$/i.test(dateValidity)) {
    return 'La date de validité doit être au format MM/AA';
  }
  return undefined;
};

const dateFormatValidator = (message: string) => (date: string): string => {
  if (!date) {
    return message;
  }
  if (!moment(date, 'DD/MM/YYYY').isValid()) {
    return 'La date de validité doit être au format JJ/MM/AAAA';
  }
  return undefined;
};

const creditCardValidator = (message: string) => (cardNumber: string): string => {
  if (!cardNumber) {
    return message;
  }
  if (!/^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/i.test(cardNumber)) {
    return 'Le numéro de votre carte de crédit doit être au format 9999 9999 9999 9999';
  }
  return undefined;
};

const cryptogramValidator = (message: string) => (cryptogram: string): string => {
  if (!cryptogram) {
    return message;
  }
  if (!/^[0-9]{3}$/i.test(cryptogram)) {
    return 'Le cryptogramme doit être un nombre de 3 chiffres';
  }
  return undefined;
};

const pinCodeValidator = (message: string) => (pinCode: string): string => {
  if (!pinCode) {
    return message || 'Le code de sécutité doit être un nombre de 4 chiffres';
  }
  if (!/^[0-9]{4}$/i.test(pinCode)) {
    return 'Le code de sécutité doit être un nombre de 4 chiffres';
  }
  return undefined;
};

export const convertToFloat = value => value ? parseFloat(value.toString().replace(',', '.')) : 0;

const noOptionSelected = (message: string) => (value: string): string => {
  if (!value || value === '?') {
    return message;
  }
  return undefined;
};

const priceValidator = (message: string, maxValue?: number, unite?: string) => (value: number): string => {
  if (value && !/^[0-9,.]+$/g.test(value.toString())) {
    return 'Le format du champ est invalide';
  }

  if (convertToFloat(value) <= 0 || isNaN(convertToFloat(value))) {
    return message;
  }

  if (maxValue != null && convertToFloat(value) > maxValue) {
    return `La valeure maximale est de ${maxValue} ${unite != null ? unite : '€'}`;
  }

  return undefined;
};

const phoneNumberValidator = (phone: string): string => {
  if (!phone) {
    return 'Veuillez renseigner votre numéro de téléphone personnel';
  }
  if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/i.test(phone)) {
    return 'Le format du numéro de est invalide';
  }
  return undefined;
};

const zipCodeValidator = (zipcode: string): string => {
  if (!zipcode) {
    return 'Vous devez entrer un code postal';
  }
  if (!/^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/i.test(zipcode)) {
    return 'Le format du code postal est invalide';
  }
  return undefined;
};

const nameValidator = (message: string) => (name: string): string => {
  if (!name) {
    return message;
  }
  if (!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/i.test(name)) {
    return 'Le format est invalide';
  }
  return undefined;
};
const codeValidator = (ean13: string): string => {
  if (!ean13) {
    return 'Veuillez renseigner les 13 chiffres du code bar ou le n° du bon (9 caractères max)';
  }

  if (ean13.length > 9 && !/[0-9]{13}$/i.test(ean13)) {
    return 'Le code doit être composé soit de 13 chiffres, soit de caractères alphanumériques du n° du bon d\'échange';
  }

  if (ean13.length > 13) {
    return 'Code invalide: veuillez entrer les 13 chiffres du code bar ou les caractères alphanumériques du bon d\'échange';
  }
  return undefined;
};

const siretValidator = (required?: boolean) => (siret: string): string => {
  const errorMessage = 'N° SIRET invalide';
  const size = 14;

  if (!siret) return required === true ? 'Le numéro de SIRET est requis' :  undefined;
  if (isNaN(+siret) || siret.length !== size) return errorMessage;

  let bal = 0;
  let total = 0;

  for (let i = size - 1; i >= 0; i--) {
    const step = (siret.charCodeAt(i) - 48) * (bal + 1);
    total += (step > 9) ? step - 9 : step;
    bal = 1 - bal;
  }

  return (total % 10 === 0) ? undefined : errorMessage;
};

const rppsValidator = (required?: boolean) => (rpps: string): string => {
  const errorMessage = 'Le numéro RPPS doit être constitué de 11 chiffres';
  const size = 11;

  if (!rpps) return required === true ? 'Le numéro de RPPS est requis' :  undefined;
  if (isNaN(+rpps) || rpps.length !== size) return errorMessage;

  return undefined;
};

const urlValidator = (url: string) => {
  if (!url) return undefined;
  const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g);
  return res ? undefined : 'L\'adresse du site internet n\'est pas valide.';
};

const ibanValidator = (iban: string) => {
  if (!iban) return undefined;
  return IBAN.isValid(iban) ? undefined : 'L\'IBAN n\'est pas valide.';
};

const bicValidator = (bic: string) => {
  if (!bic) return undefined;
  const res = bic.toUpperCase().match(/^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/);
  return res ? undefined : 'Le BIC n\'est pas valide.';
};

export {
  codeValidator,
  nameValidator,
  noEmptyValidator,
  phoneNumberValidator,
  zipCodeValidator,
  emailValidator,
  passwordValidator,
  dateValidator,
  dateFormatValidator,
  creditCardValidator,
  validityDateValidator,
  cryptogramValidator,
  pinCodeValidator,
  noOptionSelected,
  siretValidator,
  urlValidator,
  ibanValidator,
  bicValidator,
  priceValidator,
  rppsValidator,
};
