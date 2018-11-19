import { IResultMessage } from 'common/actions';

export interface StateWithPagination<T> {
  currentValue?: T;
  values?:  Array<T>;
  count?: number;
  skip?: number;
  totalCount?: number;
  isFetching?: boolean;
  errors?: Array<IResultMessage>;
}
