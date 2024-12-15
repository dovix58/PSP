import {Product} from "./entityInterfaces";

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