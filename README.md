### Intro
Sandbox excercise from Shift Academy Bootcamp to create a REST API for a fictional bookstore.

### Deployment
This app is deployed on Heroku + PostgreSQL as the add-on [here](https://lit-basin-75259.herokuapp.com/transactions/users)

### Endpoints
- `GET /users`
- `POST /users`
- `PUT /users`
- `DELETE /users`
- `GET /books`
- `POST /books`
- `PUT /books`
- `DELETE /books`
- `POST /transactions`
- `GET /transactions/users`

### Known issues/bugs:
- Validation on `POST "/transactions"` not yet making sure the `users_id` or `books_id` is present in `users` tabel or `books` table respectively.
- PostgreSQL autoincrement does not automatically figure out the last existing row's id. I had to `POST` a lot up to an id that's not been used to successfully `INSERT INTO` any table.
- Not yet implemented routes/endpoints for getting and posting `type_books`.