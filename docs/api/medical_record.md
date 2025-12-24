# Medical Record (`/medical-records`)

| Method | Endpoint | Description   | Request Body                                                                                              |
| :----- | :------- | :------------ | :-------------------------------------------------------------------------------------------------------- |
| POST   | `/`      | Create Record | `{ "userId": "student_id", "condition": "Asthma", "bloodGroup": "O+", "emergencyContact": "1234567890" }` |
| GET    | `/`      | List Records  | -                                                                                                         |
| GET    | `/:id`   | Get Record    | -                                                                                                         |
| PUT    | `/:id`   | Update Record | `{ "medications": ["Inhaler"] }`                                                                          |
| DELETE | `/:id`   | Delete Record | -                                                                                                         |

## cURL Examples

### Create Medical Record

```bash
curl -X POST http://localhost:3000/api/v1/medical-records \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "replace_with_student_id",
    "condition": "Asthma",
    "bloodGroup": "O+",
    "emergencyContact": "1234567890"
  }'
```

### List Medical Records

```bash
curl -X GET http://localhost:3000/api/v1/medical-records \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Medical Record by ID

```bash
curl -X GET http://localhost:3000/api/v1/medical-records/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Medical Record

```bash
curl -X PUT http://localhost:3000/api/v1/medical-records/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "medications": ["Inhaler", "Claritin"]
  }'
```

### Delete Medical Record

```bash
curl -X DELETE http://localhost:3000/api/v1/medical-records/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
