export interface Response {
  status: number;
  message: string;
  data?: any;
}

export interface ResponsePaginated {
  data: any[];
  pageCount: number;
  totalCount: number;
}
