const mysql = require("mysql2/promise");
require("dotenv").config();

class Database {
  constructor() {
    this.pool = null;
    this.init();
  }

  init() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "ultimate_gato",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    this.testConnection();
  }

  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      console.log("✅ Conectado a la base de datos MySQL");
      connection.release();
    } catch (error) {
      console.error("❌ Error conectando a MySQL:", error.message);
      process.exit(1);
    }
  }

  async query(sql, params = []) {
    try {
      // Si params no es array, convertirlo
      const queryParams = Array.isArray(params) ? params : [params];

      // Asegurar que los parámetros sean primitivos válidos
      const cleanParams = queryParams.map((param) => {
        if (param === undefined || param === null) {
          return null;
        }
        if (typeof param === "object" && !(param instanceof Date)) {
          return JSON.stringify(param);
        }
        return param;
      });

      const [rows] = await this.pool.execute(sql, cleanParams);
      return rows;
    } catch (error) {
      console.error("Error en consulta SQL:", error.message);
      console.error("SQL:", sql);
      console.error("Parámetros:", params);
      throw error;
    }
  }

  async queryOne(sql, params = []) {
    const rows = await this.query(sql, params);
    return rows[0] || null;
  }

  async insert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const sql = `INSERT INTO ${table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;
    const result = await this.query(sql, values);

    return { id: result.insertId, ...data };
  }

  async update(table, id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
    await this.query(sql, [...values, id]);

    return { id, ...data };
  }

  async delete(table, id) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    await this.query(sql, [id]);
    return true;
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log("Conexión a MySQL cerrada");
    }
  }
}

module.exports = new Database();
