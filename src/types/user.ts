export interface UserInfo {
  uid: string;
  displayName: string;
  phoneNumber: string;
  addresses: Address[];
  defaultAddressIndex: number;
  updatedAt:any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}
