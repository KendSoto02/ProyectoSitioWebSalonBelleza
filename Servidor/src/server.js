const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();

// Configuración de bodyParser y cors
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a la base de datos
const config = {
  user: 'Lady',
  password: 'lady12345',
  server: 'localhost',
  database: 'Proyecto_Salon_Belleza',
  port: 1433,
  encrypt: false
};

// Ruta para manejar las solicitudes POST
// app.post('/enviar-datos', (req, res) => {
//   // Obtener los datos enviados en la solicitud
//   const { nombre, telefono } = req.body;

//   // Conectar a la base de datos y guardar los datos
//   sql.connect(config, err => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Error de servidor');
//     } else {
//       const request = new sql.Request();
//       const query = `INSERT INTO formulario (nombre, telefono) VALUES ('${nombre}', '${telefono}')`;
//       request.query(query, (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send('Error de servidor');
//         } else {
//           res.status(200).send('Datos guardados correctamente');
//         }
//       });
//     }
//   });
// });

app.post('/enviar-datos', (req, res) => {
  // Obtener los datos enviados en la solicitud
  const { nombre, telefono, fechaHora, servicio, producto } = req.body;

  // Conectar a la base de datos y llamar al stored procedure
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('servicio', sql.NVarChar(50), servicio);
      request.input('producto', sql.NVarChar(50), producto);
      request.input('NombreCliente', sql.NVarChar(50), nombre);
      request.input('MedioContactoCliente', sql.NVarChar(50), telefono);
      request.input('FechaHora', sql.DateTime, fechaHora);
      console.log(servicio)
      request.execute('AgendarCita', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('Su cita fue agendada correctamente');
        }
      });
    }
  });
});


// Ruta para manejar las solicitudes GET
app.get('/obtener-datos', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC mostrarCitas';  // Llamada al procedimiento almacenado
      request.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).json(result.recordset);
        }
      });
    }
  });
});


app.post('/insertar-datos', (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  //const datos = req.body;
  const { imagen, descripcion, precio } = req.body;
  // Conectar a la base de datos y guardar los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();

      // Configurar los parámetros del stored procedure
      request.input('Descripcion', sql.NVarChar(100), descripcion);
      request.input('Precio', sql.Money, precio);

      // Ejecutar el stored procedure
      request.execute('InsertarServicio', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('Datos creados correctamente');
        }
      });
    }
  });
});




// Iniciar el servidor Node.js
const port = 3001;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
