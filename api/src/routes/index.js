const { Router } = require("express");
const getDogs = require("../controllers/getDogs");
const getDogsByID = require("../controllers/getDogsByID");
const getDogsByName = require("../controllers/getDogsByName");
const getTemperaments = require("../controllers/getTemperaments");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs/", async (req, res) => {
  const { name } = req.query;
  try {
    const data = name ? await getDogsByName(name) : await getDogs();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/dogs", async (req, res) => {
  try {
    const data = await getDogs();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getDogsByID(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const data = await getTemperaments();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// const characters = status
//   ? await findAllCharacters({ status })
//   : await findAllCharacters();
module.exports = router;
