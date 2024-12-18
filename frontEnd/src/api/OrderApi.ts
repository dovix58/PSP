import {Order} from "./entityInterfaces";

export function updateOrder(orderId): Promise<Order> {
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request(`/api/v1/orders/${orderId}/close`, {
        method: 'PUT',
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as Order
        })
}