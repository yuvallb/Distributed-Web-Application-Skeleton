# API testing

Use the following commands to test the API functionallity.

You can run them in the console, or import into Postman.

## Notes API

### Add
`
curl -i  -X POST http://localhost:8080/notes/ -H "Content-Type: application/json" -d '{"title": "the note title"}'
`

### Get one
`
curl -i http://localhost:8080/notes/624f2e20-b59a-4ba2-8425-12a81857705f
`

### Search
`
curl -i  -X POST http://localhost:8080/notes/search -H "Content-Type: application/json" -d '{"text": "david"}'
`

### Update
`
curl -i  -X PUT http://localhost:8080/notes/624f2e20-b59a-4ba2-8425-12a81857705f -H "Content-Type: application/json" -d '{"id":"624f2e20-b59a-4ba2-8425-12a81857705f", "title": "other note title"}'
`

### Delete
`
curl -i -X DELETE http://localhost:8080/notes/624f2e20-b59a-4ba2-8425-12a81857705f
`

