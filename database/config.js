const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.k3myi.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex:true
      }
    );
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al momento de conectar la Base de Datos");
  }
};

module.exports = { dbConnection };
