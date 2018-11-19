import { IActionResult } from 'common/actions';

export interface ICRUDService<T> {
  read(id: string) : Promise<T>;
  count() : Promise<number>;
  add(args: T) : Promise<IActionResult<T>>;
  update(args: T) : Promise<IActionResult<T>>;
  delete(id:string) : Promise<IActionResult<T>>;
}
