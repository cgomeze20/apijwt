const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  console.log(req.body);

  const evento = new Evento(req.body);

  try {
    evento.user = req.uid; //evento.user viene del modelo Evento y la propiedad user

    console.log(req);

    const eventoDB = await evento.save();

    res.json({
      ok: true,
      msg: "crear evento",
      evento: eventoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(id);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {
      new: true,
    });

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Contacte al Administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(id);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el evento por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para eliminar este evento",
      });
    }

    await Evento.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Evento eliminado",
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacte al Administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
