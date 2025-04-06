<div align="center">
   <br />
      <p>
         <img src="./assets/images/ohthevulgarity.png">
      </p>

   ![Discord](https://img.shields.io/discord/1352807376104722564?style=for-the-badge)
   ![GitHub License](https://img.shields.io/github/license/VulgarBear/vulgarityAPI?style=for-the-badge)
   ![GitHub Tag](https://img.shields.io/github/v/tag/VulgarBear/vulgarityAPI?style=for-the-badge)

   ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/vulgarbear/vulgarityapi/latest?style=for-the-badge)
   ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/vulgarbear/vulgarityAPI/main?style=for-the-badge)
   [![Made with Docker](https://img.shields.io/badge/Made_with-Docker-blue?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/ "Go to Docker homepage")
   [![Made with GH Actions](https://img.shields.io/badge/CI-GitHub_Actions-blue?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions "Go to GitHub Actions homepage")

<strong>A RESTful API for managing and retrieving insults. Built with Node.js, Express, and PostgreSQL.</strong>
</div>


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
