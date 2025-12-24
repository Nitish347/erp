# Exam API

Base URL: `/api/v1`

**Headers**:

- `Authorization`: `Bearer <token>`

## Exams (`/exams`)

### Create Exam

- **URL**: `/exams`
- **Method**: `POST`
- **Body**:

```json
{
  "name": "Mid-Term Exam",
  "type": "Written",
  "subjectId": "mongoId",
  "classId": "mongoId",
  "date": "2024-12-15T09:00:00Z",
  "durationMinutes": 120,
  "totalMarks": 100
}
```

### List Exams

- **URL**: `/exams`
- **Method**: `GET`

### Update Exam

- **URL**: `/exams/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "date": "2024-12-20T09:00:00Z"
}
```

### Delete Exam

- **URL**: `/exams/:id`
- **Method**: `DELETE`

## Exam Results (`/exam-results`)

### Add Result

- **URL**: `/exam-results`
- **Method**: `POST`
- **Body**:

```json
{
  "examId": "mongoId",
  "studentId": "mongoId",
  "marksObtained": 85,
  "remarks": "Good"
}
```

### List Results

- **URL**: `/exam-results`
- **Method**: `GET`
- **Query Params**: `?examId=...` or `?studentId=...`

### Update Result

- **URL**: `/exam-results/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "marksObtained": 90
}
```

### Delete Result

- **URL**: `/exam-results/:id`
- **Method**: `DELETE`
