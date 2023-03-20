export interface Item {
  id?: string;
  name: string;
  description?: string;
  qty: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
}
