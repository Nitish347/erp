# Fee (`/fees`)

| Method | Endpoint       | Description    | Request Body                                                                                                     |
| :----- | :------------- | :------------- | :--------------------------------------------------------------------------------------------------------------- |
| POST   | `/`            | Create Fee     | `{ "studentId": "id", "type": "Tuition", "amount": 5000, "dueDate": "2023-12-01", "academicYear": "2023-2024" }` |
| GET    | `/`            | List Fees      | -                                                                                                                |
| GET    | `/:id`         | Get Fee        | -                                                                                                                |
| PUT    | `/:id`         | Update Fee     | `{ "amount": 5500 }`                                                                                             |
| POST   | `/:id/payment` | Record Payment | `{ "paidAmount": 5000, "paymentMethod": "Cash", "transactionId": "TXN123" }`                                     |

## cURL Examples

### Create Fee

```bash
curl -X POST http://localhost:3000/api/v1/fees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "replace_with_student_id",
    "type": "Tuition",
    "amount": 5000,
    "dueDate": "2023-12-01",
    "academicYear": "2023-2024"
  }'
```

### List Fees

```bash
curl -X GET http://localhost:3000/api/v1/fees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Fee by ID

```bash
curl -X GET http://localhost:3000/api/v1/fees/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Fee

```bash
curl -X PUT http://localhost:3000/api/v1/fees/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5500
  }'
```

### Record Payment

```bash
curl -X POST http://localhost:3000/api/v1/fees/replace_with_id/payment \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "paidAmount": 5000,
    "paymentMethod": "Cash",
    "transactionId": "TXN123"
  }'
```
