import {Account} from "./account.model";

export interface AccountPagination{
  content:[Account],
  totalPages:number,
  totalElements:number,
  size:number,
  number:number,
  first:boolean,
  last:boolean
}
