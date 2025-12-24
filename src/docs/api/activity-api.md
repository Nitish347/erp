# Activity API

Base URL: `/api/v1`

**Headers**:

- `Authorization`: `Bearer <token>`

## Attendance (`/attendance`)

### Mark Attendance

- **URL**: `/attendance`
- **Method**: `POST`
- **Body**:

```json
{
  "classId": "mongoId",
  "date": "2024-12-10",
  "status": "Present",
  "studentId": "mongoId"
}
```

### Bulk Attendance

- **URL**: `/attendance/bulk`
- **Method**: `POST`
- **Body**:

```json
{
  "classId": "mongoId",
  "date": "2024-12-10",
  "records": [
    { "studentId": "id1", "status": "Present" },
    { "studentId": "id2", "status": "Absent" }
  ]
}
```

### Get Attendance

- **URL**: `/attendance`
- **Method**: `GET`
- **Query Params**: `?classId=...&date=...`

## Homework (`/homework`)

### Create Homework

- **URL**: `/homework`
- **Method**: `POST`
- **Body**:

```json
{
  "title": "Math Assignment",
  "description": "Solve Chapter 1 exercises",
  "subjectId": "mongoId",
  "classId": "mongoId",
  "dueDate": "2024-12-12"
}
```

### List Homework

- **URL**: `/homework`
- **Method**: `GET`

## Notices (`/notices`)

### Create Notice

- **URL**: `/notices`
- **Method**: `POST`
- **Body**:

```json
{
  "title": "Holiday Announcement",
  "content": "School will remain closed tomorrow.",
  "targetAudience": ["student", "teacher", "parent"]
}
```

### List Notices

- **URL**: `/notices`
- **Method**: `GET`
