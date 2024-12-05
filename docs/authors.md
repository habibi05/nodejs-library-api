# Api

## Get All Authors

Path: GET /api/authors

Params
```
?per_page=10
?page=1
```

Response Success

http code: 200 OK
```json
{
    "data": [
        {
            "id": 24,
            "name": "Habibi 3",
            "bio": "Bio Habibi 3",
            "birth_date": "1999-10-05",
            "createdAt": "2024-11-25T11:47:51.000Z",
            "updatedAt": "2024-11-25T11:47:51.000Z"
        },
        {
            "id": 23,
            "name": "Habibi 2",
            "bio": "Bio Habibi 2",
            "birth_date": "1999-10-05",
            "createdAt": "2024-11-25T11:46:40.000Z",
            "updatedAt": "2024-11-25T11:46:40.000Z"
        },
    ],
    "total": 50,
    "per_page": 10,
    "page": 1
}
```

## Get Detail Authors

Path: GET /api/authors/24

Response Success

http code: 200 OK
```json
{
    "data": {
        "id": 24,
        "name": "Habibi 3",
        "bio": "Bio Habibi 3",
        "birth_date": "1999-10-05T00:00:00.000Z",
        "updatedAt": "2024-11-25T11:47:51.076Z",
        "createdAt": "2024-11-25T11:47:51.076Z"
    },
    "message": "Success get author"
}
```
Response Failed

http code: 404 Not Found
```json
{
    "message": "Failed get author",
    "error": "Author doesn't exist"
}
```
http code: 400 Bad Request
```json
{
    "message": "Failed get author",
    "error": "Parameter not valid"
}
```

## Create Authors

Path: POST /api/authors/24

Request
```json
{
    "name": "Habibi 3",
    "bio": "Bio Habibi 3",
    "birth_date": "1999-10-05"
}
```

Response Succeess

http code: 201 Created
```json
{
    "data": {
        "id": 24,
        "name": "Habibi 3",
        "bio": "Bio Habibi 3",
        "birth_date": "1999-10-05T00:00:00.000Z",
        "updatedAt": "2024-11-25T11:47:51.076Z",
        "createdAt": "2024-11-25T11:47:51.076Z"
    },
    "message": "Success create authors"
}
```

Response Failed

http code: 400 Bad Request
```json
{
    "message": "Failed create authors",
    "Error": "Field 'bio' doesn't have a default value"
}
```

## Update Authors 

Path: PUT /api/authors/24

Request
```json
{
    "name": "Habibi 3",
    "bio": "Bio Habibi 3",
    "birth_date": "1999-10-05"
}
```

Response Succeess

http code: 200 OK
```json
{
    "data": {
        "id": 24,
        "name": "Habibi 3",
        "bio": "Bio Habibi 3",
        "birth_date": "1999-10-05T00:00:00.000Z",
        "updatedAt": "2024-11-25T11:47:51.076Z",
        "createdAt": "2024-11-25T11:47:51.076Z"
    },
    "message": "Success update authors"
}
```

Response Failed

http code: 400 Bad Request
```json
{
    "message": "Failed update authors",
    "Error": "Field Bio can't default value"
}
```

http code: 404 Not Found 
```json
{
    "message": "Failed update authors",
    "Error": "Author doesn't exist"
}
```

## Delete Authors

Path: DELETE /api/authors/24

Response Success

http code: 200 OK
```json
{
    "message": "Success delete authors"
}
```

Response Failed

http code: 404 Not Found 
```json
{
    "message": "Failed delete authors",
    "Error": "Author doesn't exist"
}
```

http code: 400 Bad Request
```json
{
    "message": "Failed delete authors",
    "Error": "Parameter not valid"
}