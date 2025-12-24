# Attendance (`/attendance`)

| Method | Endpoint | Description          | Request Body                                                                                                         |
| :----- | :------- | :------------------- | :------------------------------------------------------------------------------------------------------------------- |
| POST   | `/`      | Mark Attendance      | `{ "teacherId": "id", "studentId": "id", "date": "2023-10-27", "status": "Present", "class": "10", "section": "A" }` |
| POST   | `/bulk`  | Bulk Mark Attendance | `{ "attendanceData": [ { "teacherId": "id", "studentId": "id", "status": "Present" }, ... ] }`                       |
| GET    | `/`      | Get All Attendance   | -                                                                                                                    |
| GET    | `/stats` | Get Attendance Stats | -                                                                                                                    |
| PATCH  | `/:id`   | Update Attendance    | `{ "status": "Absent", "remarks": "Sick" }`                                                                          |
| DELETE | `/:id`   | Delete Attendance    | -                                                                                                                    |

## cURL Examples

### Mark Attendance

```bash
curl -X POST http://localhost:3000/api/v1/attendance \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "teacherId": "replace_with_teacher_id",
    "studentId": "replace_with_student_id",
    "date": "2023-10-27",
    "status": "Present",
    "class": "10",
    "section": "A"
  }'
```

### Bulk Mark Attendance

```bash
curl -X POST http://localhost:3000/api/v1/attendance/bulk \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "attendanceData": [
      {
        "teacherId": "replace_with_teacher_id",
        "studentId": "replace_with_student_id_1",
        "status": "Present"
      },
      {
        "teacherId": "replace_with_teacher_id",
        "studentId": "replace_with_student_id_2",
        "status": "Absent"
      }
    ]
  }'
```

### Get All Attendance

```bash
curl -X GET http://localhost:3000/api/v1/attendance \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Attendance Stats

```bash
curl -X GET http://localhost:3000/api/v1/attendance/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Attendance

```bash
curl -X PATCH http://localhost:3000/api/v1/attendance/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Absent",
    "remarks": "Marked incorrectly"
  }'
```

### Delete Attendance

```bash
curl -X DELETE http://localhost:3000/api/v1/attendance/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
