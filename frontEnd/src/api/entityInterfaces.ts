export interface Product {
    id: string,
    name: string,
    price: string,
    quantity: string,
    created: string,
    updated: string
}
export interface Order {
    id: string,
    employeeId: string,
    created: string,
    updated: string,
    completed: string,
    orderStatus: string
}

export interface Category {
    id: string;
    name: string;
    created: string;
    updated: string;
    products: any[];
}
