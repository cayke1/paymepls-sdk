import { Debtor } from "./debtor";

export interface Payment {
    id: string;
    value: number;
    created_at: Date;
    debtorId?: string | null;
    Debtor?: Debtor | null;
}

export interface ICreatePayment {
    value: number;
    debtorId: string;
    created_at: Date;
}