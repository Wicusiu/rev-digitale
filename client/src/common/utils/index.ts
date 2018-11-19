import * as Scroll from 'react-scroll';
import { isEqual, isObject, transform } from 'lodash';

export function generateId() {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';

export function isString(object: any) {
  return typeof object === 'string' || object instanceof String;
}

export function isArray(object: any) {
  return Array.isArray ? Array.isArray(object) : Object.prototype.toString.call(object) === '[object Array]';
}

export function isEmpty(value: any): boolean {
  return value === undefined || value === null || value === '' || value === 0 || value === GUID_EMPTY || (isArray(value) && value.length === 0);
}

export function isEmptyId(id): boolean {
  return id === undefined || id === null || id === '' || id === GUID_EMPTY;
}

export function filterProps<T>(refObject: any, propsObject: any): T {
  const persistableO1 = {} as T;
  Object.keys(propsObject).forEach((key) => {
    if (Object.keys(refObject).indexOf(key) >= 0) {
      persistableO1[key] = refObject[key];
    }
  });
  return persistableO1;
}

export interface IDictionary<_KeyType, _ValueType> {
  get(key: _KeyType): _ValueType;

  set(key: _KeyType, value: _ValueType): void;

  unset(key: _KeyType): void;

  containsKey(key: _KeyType): boolean;

  keys(): _KeyType[];

  values(): _ValueType[];
}

export class Dictionary<K, V> implements IDictionary<K, V> {

  keysStore: K[] = [];
  valuesStore: V[] = [];
  dictionary: any = {};

  constructor(init?: { key: K; value: V; }[]) {
    if (init != null) {
      for (let x = 0; x < init.length; x++) {
        this.dictionary[init[x].key.toString()] = init[x].value;
        this.keysStore.push(init[x].key);
        this.valuesStore.push(init[x].value);
      }
    }
  }

  set(key: K, value: V) {
    this.dictionary[key.toString()] = value;
    this.keysStore.push(key);
    this.valuesStore.push(value);
  }

  unset(key: K) {
    const index = this.keysStore.indexOf(key, 0);
    this.keysStore.splice(index, 1);
    this.valuesStore.splice(index, 1);

    delete this.dictionary[key.toString()];
  }

  keys(): K[] {
    return this.keysStore;
  }

  values(): any[] {
    return this.valuesStore;
  }

  containsKey(key: K) {
    return typeof this.dictionary[key.toString()] !== 'undefined';

  }

  toLookup(): IDictionary<K, V> {
    return this;
  }

  get(key: K): V {
    let value: V = null;
    if (this.containsKey(key)) {
      value = this.dictionary[key.toString()];
    }

    return value;
  }
}

export const round = (value, decimals) => {
  if (decimals === 0) {
    return value;
  }
  return Number(Math.round(value * Math.pow(10, decimals)) + Math.pow(10, 0 - decimals));
};

export const scrollToElement = (element : any = 'topAnchor') => {
  const scroller = Scroll.scroller;

  scroller.scrollTo(element, {
    duration: 500,
    delay: 100,
    smooth: 'easeInOutQuint',
    containerId: 'MainContent',
    offset: '-50',
  });
};

export const getScrollOffset = () : {top : number, left : number} => {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

  const scrollLeft = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
  const scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

  return { top : scrollTop, left : scrollLeft };
};
export const isGuid = (guid : string) : boolean => {
  return /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/.test(guid);
};

const open = (url : string, title : string, onClose : () => void, name? : string)  => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  if (name) {
    a.setAttribute('download', name);
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const getFileNameOrDefault = (name:string, mimeType:string) => {
  if (!isEmpty(name)) {
    return name ;
  }

  return `download.${mimeType.split('/').pop()}`
};

export const isBase64 = (fileAsBase64: string) => {
  if (isEmpty(fileAsBase64)) {
    return false;
  }
  return fileAsBase64.split(';')[0] == 'base64' ; //
};

export const getMimeTypeFromBase64 = (fileAsBase64: string) => {
  if (isEmpty(fileAsBase64)) {
    return null;
  }
  return fileAsBase64.split(';')[0].split(':')[1]; // Mimetype
};

export const openFileAsBase64 = (fileAsBase64: string, name?: string) => {
  const parts = fileAsBase64.split(';');
  const mimeType = parts[0].split(':')[1]; // Mimetype
  const file =  parts[1].slice(7);
  openFileAsBlob(base64toBlob(file), mimeType, getFileNameOrDefault(name, mimeType));
};

export const openFileAsBlob = (file, mimeType: string, name?: string) => {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const newBlob = new Blob([file], { type: mimeType });

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  open(data, name || 'download.png', null, name || 'download.png');
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
  }, 100);
};

export const base64toBlob = (base64Data:string, contentType?:string) => {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0 ; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  let blob:Blob;
  try {
    blob = new Blob(byteArrays, {type : contentType || '' });
  } catch (e) {
    // TypeError old chrome and FF
    window['BlobBuilder'] = window['BlobBuilder'] ||
                      window['WebKitBlobBuilder'] ||
                      window['MozBlobBuilder'] ||
                      window['MSBlobBuilder'];
    if (e.name === 'TypeError' && window['BlobBuilder']) {
      const bb = window['BlobBuilder']();
      bb.append(byteArrays);
      blob = bb.getBlob(contentType);
    } else if (e.name === 'InvalidStateError') {
      // InvalidStateError (tested on FF13 WinXP)
      blob = new Blob(byteArrays, {type : contentType});
    }  else {
      // We're screwed, blob constructor unsupported entirely
    }
  }
  return blob;
};

export const getRequiredLabel = (label:string, required : boolean) => {
  return `${label} ${required === true ? '*' :''}`;
};

export const absoluteUrl = (url: string): string => {
  let res: string = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    res = `http://${url}`;
  }
  return res;
};

export const getAge = (birthdate:Date) : string => {
  return Math.abs(new Date(Date.now() - (birthdate).getTime()).getUTCFullYear() - 1970).toString() ;
};

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export const  deepDifference = (object, base) => {
  function changes(object, base) {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
};

/**
 * Format a date to DD/MM/YYYY
 * @param   {Date}    inputFormat Object to format
 * @return  {string}              Return a sting of the formatted date
 */
export const formatDate = (inputFormat: Date): string => {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  const d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};
