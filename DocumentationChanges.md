# Changes from the documentation
## API contracts
- In the documentation, in some cases UUID parameters are represented by a string while in others it is UUID. We could not understand why because there were no explanation.
- In the Product POST method, removed "created" and "updated" parameters because they are unnecessary and can be known from the system.
## System Design
- Since we decided to not implement tax and discounts we opted to have a composite primary key for Order_Product which is made up of orderId and ProductId. 
- In the Order Ent
- orderProduct url was changed to a more REST format as in orders/{orderId}/products rather than giving the order id in the requestBody