# Academic API

Base URL: `/api/v1`

**Headers**:

- `Authorization`: `Bearer <token>`

## Classes (`/classes`)

### Create Class

- **URL**: `/classes`
- **Method**: `POST`
- **Body**:

```json
{
  "name": "Class 10-A",
  "grade": "10",
  "section": "A",
  "academicYear": "2024-2025"
}
```

### List Classes

- **URL**: `/classes`
- **Method**: `GET`

### Get Class by ID

- **URL**: `/classes/:id`
- **Method**: `GET`

### Update Class

- **URL**: `/classes/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "name": "Class 10-B"
}
```

### Delete Class

- **URL**: `/classes/:id`
- **Method**: `DELETE`

## Subjects (`/subjects`)

### Create Subject

- **URL**: `/subjects`
- **Method**: `POST`
- **Body**:

```json
{
  "name": "Mathematics",
  "code": "MATH101",
  "classId": "mongoId",
  "teacherId": "mongoId"
}
```

### List Subjects

- **URL**: `/subjects`
- **Method**: `GET`

### Get Subject by ID

- **URL**: `/subjects/:id`
- **Method**: `GET`

### Update Subject

- **URL**: `/subjects/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "name": "Advanced Mathematics"
}
```

### Delete Subject

- **URL**: `/subjects/:id`
- **Method**: `DELETE`

## Timetables (`/timetables`)

### Create Timetable Entry

- **URL**: `/timetables`
- **Method**: `POST`
- **Body**:

```json
{
  "classId": "mongoId",
  "day": "Monday",
  "period": 1,
  "subjectId": "mongoId",
  "startTime": "09:00",
  "endTime": "10:00"
}
```

### List Timetables

- **URL**: `/timetables`
- **Method**: `GET`
- **Query Params**: `?classId=...` or `?teacherId=...`

### Update Timetable

- **URL**: `/timetables/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "day": "Tuesday"
}
```

### Delete Timetable

- **URL**: `/timetables/:id`
- **Method**: `DELETE`
