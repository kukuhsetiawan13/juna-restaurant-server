## Endpoints

List of Available Endpoints:
- `GET /food`

- `POST /transaction/create`
- `POST /transaction/find`

- `POST /coupons/verify`
- `GET /coupons`

&nbsp;


### 1. GET /food
#### Description
- Fetch food list from the database


#### Response
_200 - OK_

- Body
    ```json
    [
      {
          "id": 1,
          "name": "Super Supreme",
          "toppings": "Ground beef, chicken ham, pepperoni, sausages, onions, olives, paprica",
          "price": 19.99,
          "picture": "https://i1.wp.com/thepizzalads.com/wp-content/uploads/2017/08/Super-Supreme-Pizza-Hut-Pizza-Review.jpg?fit=590%2C440&ssl=1",
          "additionalInfos": "beef, chicken, best-seller",
          "createdAt": "2023-01-27T02:52:58.433Z",
          "updatedAt": "2023-01-27T02:52:58.433Z"
      },
      {
          "id": 2,
          "name": "Meat Lovers",
          "toppings": "Pepperoni, sausages, ham, mozarella, tomatoes",
          "price": 18.99,
          "picture": "http://iamafoodblog.com/wp-content/uploads/2015/10/meatlovers-pizza-8w.jpg",
          "additionalInfos": "beef, best-seller",
          "createdAt": "2023-01-27T02:52:58.433Z",
          "updatedAt": "2023-01-27T02:52:58.433Z"
      },
    ...,
    ]
    ```

&nbsp;

### 2. POST /transaction/create
#### Description
- Create a new transaction with orders

#### Request
- Body
    ```json
    {
        "tableId": Integer,
        "orders": [
            {
            "FoodId": Integer,
            "name": String,
            "price": Float | required,
            "quantity": Integer | required
            },
            {
            "FoodId": Integer | required,
            "name": String,
            "price": Float | required,
            "quantity": Integer | required
            }
        ],
        "coupon": {
            "id": Integer,
            "name": String,
            "type": String,
            "discount": String,
            "freeItem": String,
            "minimumPurchase": Float,
            "backgroundImage": String,
            "createdAt": String,
            "updatedAt": String
        },
    }
    ```
    
#### Response
_Response (201 - Created)_

```json
{
    "id": 1,
    "tableId": 1,
    "totalItems": 6,
    "totalPrice": 34.98,
    "updatedAt": "2023-01-27T02:55:49.148Z",
    "createdAt": "2023-01-27T02:55:49.148Z",
    "coupon": {
        "id": 1,
        "name": "PIZZAFEST",
        "type": "discount",
        "discount": "10",
        "freeItem": "",
        "minimumPurchase": 100,
        "backgroundImage": "https://www.teahub.io/photos/full/32-327924_pizza-background.jpg",
        "createdAt": "2023-01-29T13:30:55.550Z",
        "updatedAt": "2023-01-29T13:30:55.550Z"
    },
    "orders": [
        {
            "FoodId": 3,
            "name": "Triple Cheese",
            "price": 19.99,
            "quantity": 2
        },
        {
            "FoodId": 11,
            "name": "Aglio Olio",
            "price": 14.99,
            "quantity": 4
        }
    ]
}
```

_400 - Bad Request_
- Body
    ```json
    {
        "Table ID must be provided."
    }
    OR
    {
        "Table ID must be an integer."
    }
    OR
    {
        "Total items must be provided."
    }
    OR
    {
        "Total items must be an integer."
    }
    OR
    {
        "Total price must be provided."
    }
    OR
    {
        "Total price must be in float format."
    }
    OR
    {
        "Food ID must be provided."
    }
    OR
    {
        "Food ID must be an integer."
    }
    OR
    {
        "Transaction ID must be provided."
    }
    OR
    {
        "Transaction ID must be an integer."
    }
    OR
    {
        "Quantity must be provided."
    }
    OR
    {
        "Quantity must be an integer."
    }
     OR
    {
        "Price must be provided."
    }
    OR
    {
        "Price must be in float format."
    }
    OR
    {
        "Orders must be provided."
    }
    ```
&nbsp;

### 3. POST /transaction/find
#### Description
- Fetch transaction with orders by transaction ID

#### Request
- Body
    ```json
    {
      "TransactionId": Integer | required,
      "securityCode": Integer
    }
    ```
#### Response
_200 - Ok
- Body
    ```json
    {
    "id": 1,
    "tableId": 1,
    "totalItems": 6,
    "totalPrice": 34.98,
    "coupon": "FREELEMONADE",
    "createdAt": "2023-01-27T02:55:49.148Z",
    "updatedAt": "2023-01-27T02:55:49.148Z",
    "orders": [
        {
            "id": 1,
            "FoodId": 3,
            "TransactionId": 1,
            "quantity": 2,
            "price": 19.99,
            "createdAt": "2023-01-27T02:55:49.160Z",
            "updatedAt": "2023-01-27T02:55:49.160Z",
            "Food": {
                "id": 3,
                "name": "Triple Cheese",
                "toppings": "Mozarella, cheddar, parmesan",
                "price": 19.99,
                "picture": "https://assets.website-files.com/5df16fba6ec9f6f23930b21d/5df16fba6ec9f63cab30b3a2_triple-cheese.jpg",
                "additionalInfos": "vegetarian, best-seller",
                "createdAt": "2023-01-27T02:52:58.433Z",
                "updatedAt": "2023-01-27T02:52:58.433Z"
            }
        },
        {
            "id": 2,
            "FoodId": 11,
            "TransactionId": 1,
            "quantity": 4,
            "price": 14.99,
            "createdAt": "2023-01-27T02:55:49.164Z",
            "updatedAt": "2023-01-27T02:55:49.164Z",
            "Food": {
                "id": 11,
                "name": "Aglio Olio",
                "toppings": "Spaghetti, tuna, mushrooms, paprica",
                "price": 14.99,
                "picture": "https://i.pinimg.com/originals/92/5c/57/925c570ce246cc82c593a39c7d5b2f1c.jpg",
                "additionalInfos": "",
                "createdAt": "2023-01-27T02:52:58.433Z",
                "updatedAt": "2023-01-27T02:52:58.433Z"
            }
        },
        ...
    ]
  }
    ```
```
Response (403 - Forbidden)_

  ```json
  {
    "message": "Forbidden."
  }
  ```
&nbsp;

Response (404 - Not Found)_

  ```json
  {
    "message": "Data not found."
  }
  ```
&nbsp;

### 4. POST /coupons/verify
#### Description
- Verify whether a coupon is valid or not

#### Request
- Body
    ```json
    {
        "TransactionId": Number,
        "subTotal": Number
    }
    ```
    
#### Response
_Response (200 - Ok)_

```json
{
    "id": 2,
    "name": "FREELEMONADE",
    "type": "freeItem",
    "discount": "",
    "freeItem": "Ice Tea Lemonade",
    "minimumPurchase": 40,
    "backgroundImage": "https://c4.wallpaperflare.com/wallpaper/904/941/123/fresh-lemonade-wallpaper-preview.jpg",
    "createdAt": "2023-01-29T13:30:55.551Z",
    "updatedAt": "2023-01-29T13:30:55.551Z"
}
```

_400 - Bad Request_
- Body
    ```json
    {
        "Coupon must be provided."
    }
    OR
    {
        "You haven't reached minimum amount."
    }
    OR
    {
        "Invalid Coupon."
    }
    ```
&nbsp;

### 5. GET /coupons
#### Description
- Fetch coupons


#### Response
_200 - Ok
- Body
    ```json
   [
        {
            "id": 1,
            "name": "PIZZAFEST",
            "type": "discount",
            "discount": "10",
            "freeItem": "",
            "minimumPurchase": 100,
            "backgroundImage": "https://www.teahub.io/photos/full/32-327924_pizza-background.jpg",
            "createdAt": "2023-01-29T13:30:55.550Z",
            "updatedAt": "2023-01-29T13:30:55.550Z"
        },
        {
            "id": 2,
            "name": "FREELEMONADE",
            "type": "freeItem",
            "discount": "",
            "freeItem": "Ice Tea Lemonade",
            "minimumPurchase": 40,
            "backgroundImage": "https://c4.wallpaperflare.com/wallpaper/904/941/123/fresh-lemonade-wallpaper-preview.jpg",
            "createdAt": "2023-01-29T13:30:55.551Z",
            "updatedAt": "2023-01-29T13:30:55.551Z"
        },
        ```
    ]
    ```
```






### Global Error
#### Response

```
_500 - Internal Server Error_
- Body
    ```json
    {
        "message": "Internal Server Error"
    }
    ```
&nbsp;

