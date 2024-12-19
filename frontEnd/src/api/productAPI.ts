import {Product, Category} from "./entityInterfaces.ts";


export function getCategories(): Promise<Category[]> {
    const headers: Headers = new Headers();

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request('/api/v1/categories', {
        method: 'GET',
        headers: headers
    });

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res as Category[];
        });
}

export function getAllProducts(): Promise<Product[]> {
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request('/api/v1/products', {
        method: 'GET',
        headers: headers
    })

    return fetch(request)
        // the JSON body is taken from the response
        .then(res => res.json())
        .then(res => {
            // The response has an `any` type, so we need to cast
            // it to the `User` type, and return it from the promise
            return res as Product[]
        })
}

export function createProduct(name, price, quantity, categoryId): Promise<Product> {
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request('/api/v1/products', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            price: price,
            quantity: quantity,
            categoryId: categoryId
        }),
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as Product
        })
}

export function updateProduct(id, name, price, quantity): Promise<Product> {
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request(`/api/v1/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            price: price,
            quantity: quantity
        }),
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as Product
        })
}

export function deleteProduct(id): Promise<Product> {
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request(`/api/v1/products/${id}`, {
        method: 'DELETE',
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as Product
        })
}