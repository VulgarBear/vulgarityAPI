# VulgarityAPI

A RESTful API for managing and retrieving insults. Built with Node.js, Express, and PostgreSQL.

## Features

- Random insult retrieval
- Create new insults
- Get insults by author
- Delete insults by ID
- PostgreSQL database integration

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Docker and Docker Compose (optional)

## Installation

### Option 1: Manual Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd vulgarAPI
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```
POSTGRES_USER=your_username
POSTGRES_HOST=your_host
POSTGRES_DB=your_database
POSTGRES_PASSWORD=your_password
POSTGRES_PORT=5432
```

4. Create the database table:
```sql
CREATE TABLE insult (
    id INTEGER PRIMARY KEY,
    insult TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sequence for auto-incrementing ID
CREATE SEQUENCE IF NOT EXISTS insult_id_seq;
ALTER TABLE insult ALTER COLUMN id SET DEFAULT nextval('insult_id_seq');
```

### Option 2: Docker Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd vulgarAPI
```

2. Build and start the containers:
```bash
docker-compose up -d
```

3. The application will be available at http://localhost:8080

## Running the Application

### Manual Mode

Development mode:
```bash
yarn dev
```

Production mode:
```bash
yarn start
```

The server will start on port 8080 by default.

### Docker Mode

Start the containers:
```bash
docker-compose up -d
```

Stop the containers:
```bash
docker-compose down
```

View logs:
```bash
docker-compose logs -f
```

## API Endpoints

### Get Random Insult
```
GET /insult
```
Returns a random insult from the database.

### Get Insults by Author
```
GET /insult/author/:author
```
Returns all insults by a specific author.

### Create New Insult
```
POST /insult
```
Body:
```json
{
    "insult": "Your insult text here",
    "author": "Author name"
}
```

### Delete Insult
```
DELETE /insult/:id
```
Deletes an insult by its ID.

## Testing with Postman

1. Random Insult:
   - Method: GET
   - URL: `http://localhost:8080/insult`

2. Get by Author:
   - Method: GET
   - URL: `http://localhost:8080/insult/author/{author_name}`

3. Create Insult:
   - Method: POST
   - URL: `http://localhost:8080/insult`
   - Body (JSON):
     ```json
     {
         "insult": "Your insult here",
         "author": "Author name"
     }
     ```

4. Delete Insult:
   - Method: DELETE
   - URL: `http://localhost:8080/insult/{id}`

## Error Handling

The API includes error handling for:
- Invalid input data
- Database connection issues
- Not found resources

## Logging

The application uses Pino for logging with pretty printing in development mode.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
