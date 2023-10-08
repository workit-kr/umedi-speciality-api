import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: 5432,
});
await pool.connect();

export const handler = async (event) => {
  var resp = {};
  resp = fetchSpecialities()
  return resp
}

async function fetchSpecialities() {
  try {
    const result = await pool.query('select * from umedi.speciality');
    if (result.rowCount == 0) {
      return buildResponse(404, {"message": "no items"})
    };

    return buildResponse(200, result.rows)
  }
  catch (error) {
    console.error('server error');
    return buildResponse(500, {"message": "server error"})
  }
}

function buildResponse(statusCode, respBody) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(respBody)
  }
}