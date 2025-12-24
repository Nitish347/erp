# Health & Fee API

Base URL: `/api/v1`

**Headers**:

- `Authorization`: `Bearer <token>`

## Medical Records (`/medical-records`)

### Create Record

- **URL**: `/medical-records`
- **Method**: `POST`
- **Body**:

```json
{
  "studentId": "mongoId",
  "condition": "Asthma",
  "details": "Needs inhaler",
  "dateRecorded": "2024-01-01"
}
```

### List Records

- **URL**: `/medical-records`
- **Method**: `GET`
- **Query Params**: `?studentId=...`

## Fees (`/fees`)

### Create Fee Structure

- **URL**: `/fees`
- **Method**: `POST`
- **Body**:

```json
{
  "name": "Tuition Fee - Class 10",
  "amount": 5000,
  "currency": "INR",
  "dueDate": "2024-12-31",
  "classId": "mongoId"
}
```

### List Fees

- **URL**: `/fees`
- **Method**: `GET`

### Pay Fee (Conceptual)

There may be a specific endpoint for transactions or updates to fee status via `PATCH` on a specific student fee record.
