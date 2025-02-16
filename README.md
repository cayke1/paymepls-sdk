# PayMeSDK

PayMeSDK is a TypeScript wrapper for interacting with the payment API in a simple and intuitive way.

## Installation

Install via npm or yarn:

```sh
npm install paymepls-sdk
# or
yarn add paymepls-sdk
```

## Usage

```ts
import { PayMeSDK } from "paymepls-sdk";

const sdk = new PayMeSDK("https://api.caykedev.com", "your_token_here");

// Authentication
const loginResponse = await sdk.auth.login("email@example.com", "password123");
console.log(loginResponse);

// List bills
const bills = await sdk.bills.getAll();
console.log(bills);

// Create a new debtor
const debtor = await sdk.debtors.create({ name: "New Debtor" });
console.log(debtor);
```

## API

### **Instance**

```ts
const sdk = new PayMeSDK(baseURL?: string, token?: string);
```
- `baseURL`: API URL (default: `https://api.caykedev.com`).
- `token`: Optional authentication token.

### **Authentication**

```ts
sdk.auth.login(email: string, password: string): Promise<{ token: string }>
sdk.auth.register(body: ICreateUser): Promise<any>
sdk.auth.verify(): Promise<any>
```

### **Bills**

```ts
sdk.bills.getAll(): Promise<Bill[]>
sdk.bills.create(body: ICreateBill): Promise<Bill>
sdk.bills.update(id: string, body: IUpdateBill): Promise<Bill>
```

### **Debtors**

```ts
sdk.debtors.getAll(): Promise<Debtor[]>
sdk.debtors.create(body: ICreateDebtor): Promise<Debtor>
sdk.debtors.delete(id: string): Promise<void>
```

### **Payments**

```ts
sdk.payments.getAll(): Promise<Payment[]>
sdk.payments.getFromDebtor(debtorId: string): Promise<Payment[]>
sdk.payments.create(body: ICreatePayment): Promise<Payment>
sdk.payments.delete(id: string): Promise<void>
```

### **Token Management**

```ts
sdk.setToken(token: string)
sdk.clearToken()
```