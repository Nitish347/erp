# Timetable (`/timetables`)

| Method | Endpoint     | Description       | Request Body                                                                                                                                                  |
| :----- | :----------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/teacher`   | Create Teacher TT | `{ "teacherId": "id", "dayOfWeek": "Monday", "periods": [ { "startTime": "09:00", "endTime": "10:00", "class": "10", "section": "A", "subject": "Math" } ] }` |
| POST   | `/student`   | Create Student TT | `{ "class": "10", "section": "A", "dayOfWeek": "Monday", "periods": [ { "startTime": "09:00", "endTime": "10:00", "subject": "Math", "teacherId": "id" } ] }` |
| GET    | `/`          | List Timetables   | -                                                                                                                                                             |
| GET    | `/conflicts` | Check Conflicts   | -                                                                                                                                                             |

## cURL Examples

### Create Teacher Timetable

```bash
curl -X POST http://localhost:3000/api/v1/timetables/teacher \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "teacherId": "replace_with_teacher_id",
    "dayOfWeek": "Monday",
    "periods": [
      {
        "startTime": "09:00",
        "endTime": "10:00",
        "class": "10",
        "section": "A",
        "subject": "Mathematics"
      }
    ]
  }'
```

### Create Student Timetable

```bash
curl -X POST http://localhost:3000/api/v1/timetables/student \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "class": "10",
    "section": "A",
    "dayOfWeek": "Monday",
    "periods": [
      {
        "startTime": "09:00",
        "endTime": "10:00",
        "subject": "Mathematics",
        "teacherId": "replace_with_teacher_id"
      }
    ]
  }'
```

### List Timetables

```bash
curl -X GET http://localhost:3000/api/v1/timetables \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Check Conflicts

```bash
curl -X GET http://localhost:3000/api/v1/timetables/conflicts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
