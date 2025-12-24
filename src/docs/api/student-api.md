# Student API

Base URL: `/api/v1/students`

**Headers**:

- `Authorization`: `Bearer <token>`

## Student Management

### List Students

- **URL**: `/`
- **Method**: `GET`
- **Description**: List all students.

### Get Student by ID

- **URL**: `/:id`
- **Method**: `GET`

### Update Student

- **URL**: `/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "firstName": "Updated Name",
  "address": "New Address"
}
```

### Delete Student

- **URL**: `/:id`
- **Method**: `DELETE`
