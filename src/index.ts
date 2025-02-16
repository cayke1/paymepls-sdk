import axios, { AxiosInstance } from "axios";
import { ICreateUser } from "./@types/user";
import { Bill, ICreateBill, IUpdateBill } from "./@types/bill";
import { Debtor, ICreateDebtor } from "./@types/debtor";
import { ICreatePayment, Payment } from "./@types/payment";

export class PayMeSDK {
    private api: AxiosInstance;
  
    constructor(baseURL: string = "https://api.caykedev.com", token?: string) {
      this.api = axios.create({ baseURL });
  
      if (token) {
        this.setToken(token);
      }
    }
  
    public setToken = (token: string) => {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };
  
    public clearToken = () => {
      delete this.api.defaults.headers.common["Authorization"];
    };
  
    private async request<T>(fn: () => Promise<T>): Promise<T> {
      try {
        return await fn();
      } catch (error: any) {
        if (error.response) {
          throw new Error(`API Error (${error.response.status}): ${error.response.data.message || "Unknown error"}`);
        }
        throw new Error("Network Error: Unable to reach API");
      }
    }
  
    // Auth
    public auth = {
      login: (email: string, password: string) =>
        this.request(() => this.api.post("/login", { email, password }).then(res => res.data)),
  
      register: (body: ICreateUser) =>
        this.request(() => this.api.post("/signup", body).then(res => res.data)),
  
      verify: () =>
        this.request(() => this.api.get("/verify").then(res => res.data)),
    };
  
    // Bills
    public bills = {
      getAll: (): Promise<Bill[]> =>
        this.request(() => this.api.get("/bill").then(res => res.data)),
  
      create: (body: ICreateBill): Promise<Bill> =>
        this.request(() => this.api.post("/bill", body).then(res => res.data)),
  
      update: (id: string, body: IUpdateBill): Promise<Bill> =>
        this.request(() => this.api.put(`/bill/${id}`, body).then(res => res.data)),
    };
  
    // Debtors
    public debtors = {
      getAll: (): Promise<Debtor[]> =>
        this.request(() => this.api.get("/debtor").then(res => res.data)),
  
      create: (body: ICreateDebtor): Promise<Debtor> =>
        this.request(() => this.api.post("/debtor", body).then(res => res.data)),
  
      delete: (id: string): Promise<void> =>
        this.request(() => this.api.delete(`/debtor/${id}`)),
    };
  
    // Payments
    public payments = {
      getAll: (): Promise<Payment[]> =>
        this.request(() => this.api.get("/payment").then(res => res.data)),
  
      getFromDebtor: (debtorId: string): Promise<Payment[]> =>
        this.request(() => this.api.get(`/payment/debtor/${debtorId}`).then(res => res.data)),
  
      create: (body: ICreatePayment): Promise<Payment> =>
        this.request(() => this.api.post("/payment", body).then(res => res.data)),
  
      delete: (id: string): Promise<void> =>
        this.request(() => this.api.delete(`/payment/${id}`)),
    };
  }
  