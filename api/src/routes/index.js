const { Router } = require("express");
const getDogs = require("../controllers/getDogs");
const getDogsByID = require("../controllers/getDogsByID");
const getDogsByName = require("../controllers/getDogsByName");
const getTemperaments = require("../controllers/getTemperaments");
const postDogs = require("../controllers/postDogs");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* *********************************************************************** */

router.get("/dogs/", async (req, res) => {
  const { name } = req.query;
  try {
    const data = name ? await getDogsByName(name) : await getDogsByName();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/***************************************************************************/

router.get("/dogs", async (req, res) => {
  try {
    const data = await getDogs();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* *********************************************************************** */

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getDogsByID(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* *********************************************************************** */

router.get("/temperaments", async (req, res) => {
  try {
    const data = await getTemperaments();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* *********************************************************************** */

router.post("/dogs", async (req, res) => {
  const { name, image, height, weight, life_span, temperaments } = req.body;
  try {
    const data = postDogs(name, image, height, weight, life_span, temperaments);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
