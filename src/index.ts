import axios, { AxiosInstance } from "axios";
import { Bill, ICreateBill, IUpdateBill } from "./@types/bill";
import { Debtor, ICreateDebtor } from "./@types/debtor";
import { ICreatePayment, Payment } from "./@types/payment";
import { ICreateUser } from "./@types/user";

export class Paymepls {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.caykedev.com",
    });
  }
  public setToken = (token: string) => {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  async login(email: string, password: string) {
    const response = await this.api.post("/login", {
      email,
      password,
    });

    return response.data;
  }

  async register(body: ICreateUser) {
    const response = await this.api.post("/signup", body);

    return response.data;
  }

  async verify() {
    if (!this.api.defaults.headers.common["Authorization"]) {
      throw new Error("No token provided");
    }
    const response = await this.api.get("/verify");

    return response.data;
  }

  // Bills
  async getBills(): Promise<Bill[]> {
    const response = await this.api.get("/bill");

    return response.data;
  }

  async createBill(body: ICreateBill): Promise<Bill> {
    const response = await this.api.post("/bill", body);
    return response.data;
  }

  async updateBill(id: string, body: IUpdateBill): Promise<Bill> {
    const response = await this.api.put(`/bill/${id}`, body);
    return response.data;
  }

  // Debtors
  async getDebtors(): Promise<Debtor[]> {
    const response = await this.api.get("/debtor");
    return response.data;
  }

  async createDebtor(body: ICreateDebtor): Promise<Debtor> {
    const response = await this.api.post("/debtor", body);
    return response.data;
  }

  async deleteDebtor(id: string): Promise<void> {
    await this.api.delete(`/debtor/${id}`);
  }

  // Payments
  async getPayments(): Promise<Payment[]> {
    const response = await this.api.get("/payment");
    return response.data;
  }

  async getPaymentFromDebtor(debtorId: string): Promise<Payment[]> {
    const response = await this.api.get(`/payment/debtor/${debtorId}`);
    return response.data;
  }

  async createPayment(body: ICreatePayment): Promise<Payment> {
    const response = await this.api.post("/payment", body);
    return response.data;
  }

  async deletePayment(id: string): Promise<void> {
    await this.api.delete(`/payment/${id}`);
  }
}
