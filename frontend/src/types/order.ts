export type BillingAddress = {
    address: string; 
    city: string; 
    state: string; 
    postal_code: string;
    country: string; 
    phone_number: string;
}

export type CreateOrder = {
    total_price: number;
    order_info: string; 
    billing_address: BillingAddress;
}