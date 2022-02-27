/*
Events Routes   /api/events
*/
const express = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const isDate = require("../helpers/isDate");

const router = express.Router();

//Todas las tutas tienen que pasar por la validacion JWT
router.use(validarJWT);

//Eventos

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("notes", "Las notas son obligatorias").not().isEmpty(),
    check("start", "Las notas son obligatorias").custom(isDate),
    check("end", "Las notas son obligatorias").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

router.put("/:id", actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
