export interface IUser {
  name: string;
  last_name: string;
  age: number;
  image_url: string;
  is_COVID_positive: string;
}

export class User implements IUser {
  age: number = 0;
  image_url: string = '';
  is_COVID_positive: string = '';
  last_name: string = '';
  name: string = '';
}
