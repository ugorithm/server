
# 🗃️ ReWork API

ReWork's official API.


## API Reference
## Auth
#### Get database

```http
  GET /auth/db
```

#### Get item

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of user wanting to log in |
| `password`      | `string` | **Required**. Password of user wanting to log in |

Returns a JSON response containing a session ID that is stored locally.
