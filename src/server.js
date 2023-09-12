const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const dbConfig = {
  user: process.env.POSTGRESQL_ADDON_USER,
  host: process.env.POSTGRESQL_ADDON_HOST,
  database: process.env.POSTGRESQL_ADDON_DB,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  port: process.env.POSTGRESQL_ADDON_PORT,
};

const pool = new Pool(dbConfig);
const port = 8080;

pool
  .connect()
  .then(() => {
    console.log("Connexion à la base de données établie.");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données : " + err);
  });
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/data", async (req, res) => {
  try {
    // Exécutez une requête SQL pour sélectionner toutes les données dans la table
    const query = "SELECT * FROM quote";

    const result = await pool.query(query);

    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données : " + err });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
