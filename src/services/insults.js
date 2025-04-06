const db = require("./db");

async function getQuery() {
  const statement = "SELECT * FROM insult ORDER BY RANDOM() LIMIT 1";
  const data = await db.query(statement);
  return { data };
}

async function getByAuthor(author) {
  const statement = "SELECT * FROM insult WHERE author = $1 ORDER BY created_at DESC";
  const data = await db.query(statement, [author]);
  return { data };
}

async function deleteById(id) {
  const result = await db.run(
    "DELETE FROM insult WHERE id = $1 RETURNING *",
    [id]
  );

  let message = "Error in deleting insult";
  if (result.rowCount > 0) {
    message = "insult deleted successfully";
    return {
      message,
      data: result.rows[0]
    };
  }

  return { message };
}

function validateCreate(insult) {
  let messages = [];

  if (!insult) {
    messages.push("No object is provided");
  }

  if (!insult.insult) {
    messages.push("insult is empty");
  }

  if (!insult.author) {
    messages.push("Author is empty");
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;
    throw error;
  }
}

async function create(insultObj) {
  validateCreate(insultObj);
  const { insult, author } = insultObj;
  const result = await db.run(
    "INSERT INTO insult (insult, author, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING id, insult, author, created_at",
    [insult, author]
  );

  let message = "Error in creating insult";
  if (result.rowCount > 0) {
    message = "insult created successfully";
    return { 
      message,
      data: result.rows[0]
    };
  }

  return { message };
}

module.exports = {
  getQuery,
  getByAuthor,
  create,
  deleteById,
  validateCreate,
};
