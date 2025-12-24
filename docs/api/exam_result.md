# Exam Result (`/results`)

| Method | Endpoint | Description   | Request Body                                                                    |
| :----- | :------- | :------------ | :------------------------------------------------------------------------------ |
| POST   | `/`      | Create Result | `{ "examId": "id", "studentId": "id", "marksObtained": 85, "remarks": "Good" }` |
| GET    | `/`      | List Results  | -                                                                               |
| GET    | `/:id`   | Get Result    | -                                                                               |
| PUT    | `/:id`   | Update Result | `{ "marksObtained": 90 }`                                                       |
| DELETE | `/:id`   | Delete Result | -                                                                               |

## cURL Examples

### Create Result

```bash
curl -X POST http://localhost:3000/api/v1/results \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "examId": "replace_with_exam_id",
    "studentId": "replace_with_student_id",
    "marksObtained": 85,
    "remarks": "Good performance"
  }'
```

### List Results

```bash
curl -X GET http://localhost:3000/api/v1/results \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Result by ID

```bash
curl -X GET http://localhost:3000/api/v1/results/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Result

```bash
curl -X PUT http://localhost:3000/api/v1/results/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "marksObtained": 90
  }'
```

### Delete Result

```bash
curl -X DELETE http://localhost:3000/api/v1/results/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
