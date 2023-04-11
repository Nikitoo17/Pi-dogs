const { Router } = require("express");
const getDogs = require("../controllers/getDogs");
const getDogsByID = require("../controllers/getDogsByID");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/razas", async (req, res) => {
  try {
    const data = await getDogs();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/razas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getDogsByID(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
