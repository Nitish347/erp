# Notice (`/notices`)

| Method | Endpoint | Description   | Request Body                                                                                                       |
| :----- | :------- | :------------ | :----------------------------------------------------------------------------------------------------------------- |
| POST   | `/`      | Create Notice | `{ "title": "Holiday", "content": "School closed", "audience": ["student", "teacher"], "classId": "optional_id" }` |
| GET    | `/`      | List Notices  | -                                                                                                                  |
| GET    | `/:id`   | Get Notice    | -                                                                                                                  |
| PUT    | `/:id`   | Update Notice | `{ "content": "Updated content" }`                                                                                 |
| DELETE | `/:id`   | Delete Notice | -                                                                                                                  |

## cURL Examples

### Create Notice

```bash
curl -X POST http://localhost:3000/api/v1/notices \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Public Holiday",
    "content": "School will be closed on Friday.",
    "audience": ["student", "teacher"],
    "classId": "optional_class_id"
  }'
```

### List Notices

```bash
curl -X GET http://localhost:3000/api/v1/notices \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Notice by ID

```bash
curl -X GET http://localhost:3000/api/v1/notices/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Notice

```bash
curl -X PUT http://localhost:3000/api/v1/notices/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated content: School will be closed on Monday instead."
  }'
```

### Delete Notice

```bash
curl -X DELETE http://localhost:3000/api/v1/notices/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
