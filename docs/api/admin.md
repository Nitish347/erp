# Admin (`/admin`)

| Method | Endpoint        | Description      | Request Body                                                                             |
| :----- | :-------------- | :--------------- | :--------------------------------------------------------------------------------------- |
| POST   | `/`             | Create Admin     | _Same as Register Admin_                                                                 |
| GET    | `/`             | List Admins      | -                                                                                        |
| GET    | `/:id`          | Get Admin by ID  | -                                                                                        |
| PATCH  | `/:id`          | Update Admin     | `{ "firstName": "Updated Name", "instituteName": "Updated Institute" }` (Partial fields) |
| DELETE | `/:id`          | Delete Admin     | -                                                                                        |
| GET    | `/teachers/all` | Get All Teachers | -                                                                                        |
| GET    | `/students/all` | Get All Students | -                                                                                        |

## cURL Examples

### List Admins (Admin/Super Admin)

```bash
curl -X GET http://localhost:3000/api/v1/admin \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Admin by ID

```bash
curl -X GET http://localhost:3000/api/v1/admin/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Admin

```bash
curl -X PATCH http://localhost:3000/api/v1/admin/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Updated Name"
  }'
```

### Delete Admin

```bash
curl -X DELETE http://localhost:3000/api/v1/admin/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Teachers

```bash
curl -X GET http://localhost:3000/api/v1/admin/teachers/all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Students

```bash
curl -X GET http://localhost:3000/api/v1/admin/students/all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
