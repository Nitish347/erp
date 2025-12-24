# Teacher API

Base URL: `/api/v1/teachers`

**Headers**:

- `Authorization`: `Bearer <token>`

## Teacher Management

### List Teachers

- **URL**: `/`
- **Method**: `GET`
- **Description**: List all teachers.

### Get Teacher by ID

- **URL**: `/:id`
- **Method**: `GET`

### Update Teacher

- **URL**: `/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "firstName": "Updated Name",
  "phone": "1234567890"
}
```

### Delete Teacher

- **URL**: `/:id`
- **Method**: `DELETE`

## Teacher Operations

### Get My Students

- **URL**: `/students`
- **Method**: `GET`
- **Description**: Get list of students assigned to the logged-in teacher (or all students if the teacher teaches the class).

### Get Student Detail

- **URL**: `/students/:studentId`
- **Method**: `GET`
