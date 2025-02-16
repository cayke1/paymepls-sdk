export interface Debtor {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  bills?: any;
  userId: string | null;
}

export interface ICreateDebtor {
  name: string;
  phone: string;
  email?: string | null;
  userId: string;
}
