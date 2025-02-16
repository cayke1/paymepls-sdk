import { Debtor } from "./debtor";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  debtors?: Debtor[] | null;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
