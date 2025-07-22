import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const caPath = path.join(process.cwd(), "src", "lib", "ca-cert.pem");
const ca = fs.readFileSync(caPath);

const connectionConfig = {
  uri: "mysql://3Kv6WiNXfeRrBaX.root:tD6PNr2JifRcBl8r@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/classicmodels",
  ssl: {
    ca: ca,
  },
};

export async function getConnection() {
  const connection = await mysql.createConnection(connectionConfig);
  return connection;
}

// Simplified query for troubleshooting
export async function getCustomers(keyword: string = "") {
  let conn;
  let sql = "SELECT * FROM customers";
  try {
    conn = await getConnection();
     
     let params: any[] = [];
     if (keyword) {
       sql += " WHERE customerName LIKE ? OR country LIKE ?";
       params = [`%${keyword}%`, `%${keyword}%`];
     }
     sql += " ORDER BY customerName LIMIT 10";
    const [rows] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    console.error("Database error in getCustomers:",sql);
   
    throw error; // Re-throw the error to be caught by the API route
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}
