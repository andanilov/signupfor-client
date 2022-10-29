enum ItemNames {
  ACCESS_TOKEN = 'access_token',
}

export default class StorageService {
  static getAccesToken = () : string => localStorage.getItem(ItemNames.ACCESS_TOKEN) ?? '';

  static setAccesToken = (token: string) : void => localStorage.setItem(ItemNames.ACCESS_TOKEN, token);

  static removeAccesToken = () : void => localStorage.removeItem(ItemNames.ACCESS_TOKEN);
}
