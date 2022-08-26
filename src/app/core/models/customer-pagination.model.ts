import {Customer} from "./customer.model";

export interface CustomerPagination{
  content:[Customer],
  totalPages:number,
  totalElements:number,
  size:number,
  number:number,
  first:boolean,
  last:boolean
}
