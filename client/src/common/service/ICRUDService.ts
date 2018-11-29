import { IActionResult } from 'common/actions';

export interface ICRUDService<T, KT> {
  read(id: KT): Promise<T>;
  count(): Promise<number>;
  add(args: Partial<T>): Promise<IActionResult<T>>;
  update(args: T): Promise<IActionResult<T>>;
  delete(id: KT): Promise<IActionResult<KT>>;
  all(filters?: string): Promise<Array<T>>;
}
