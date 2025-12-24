# Admin API

Base URL: `/api/v1/admin`

**Headers**:

- `Authorization`: `Bearer <token>`

## Admin Management

### List Admins

- **URL**: `/`
- **Method**: `GET`
- **Description**: Get all admins.

### Get Admin by ID

- **URL**: `/:id`
- **Method**: `GET`

### Update Admin

- **URL**: `/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "firstName": "Updated Name"
}
```

### Delete Admin

- **URL**: `/:id`
- **Method**: `DELETE`

## Institute Management

### Create Institute

- **URL**: `/institutes`
- **Method**: `POST`
- **Body**:

```json
{
  "firstName": "New",
  "lastName": "Inst",
  "email": "inst@example.com",
  "password": "password",
  "instituteName": "New Institute"
}
```

### List Institutes

- **URL**: `/institutes`
- **Method**: `GET`

### Get Institute by ID

- **URL**: `/institutes/:id`
- **Method**: `GET`

### Update Institute

- **URL**: `/institutes/:id`
- **Method**: `PATCH`
- **Body**:

```json
{
  "instituteName": "Updated Institute Name"
}
```

### Delete Institute

- **URL**: `/institutes/:id`
- **Method**: `DELETE`

## View All Users

### Get All Teachers

- **URL**: `/teachers/all`
- **Method**: `GET`
- **Description**: View all teachers across the system.

### Get All Students

- **URL**: `/students/all`
- **Method**: `GET`
- **Description**: View all students across the system.
