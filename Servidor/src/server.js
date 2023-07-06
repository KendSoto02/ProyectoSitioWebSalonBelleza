const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const nodemailer = require('nodemailer');

const app = express();

// Configuración de bodyParser y cors
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a la base de datos
const config = {
  user: 'Lady',
  password: '1234',
  server: 'localhost',
  database: 'Proyecto_Salon_Belleza',
  port: 1433,
  encrypt: false
};


app.post('/enviar-datos', (req, res) => {
  // Obtener los datos enviados en la solicitud
  const { nombre, telefono, fecha, hora, servicio, producto, correo } = req.body;

  // Conectar a la base de datos y llamar al stored procedure
  console.log(hora); // Imprime la hora en la consola para verificar que se haya capturado correctamente

  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('servicio', sql.NVarChar(50), servicio);
      request.input('producto', sql.NVarChar(50), producto);
      request.input('NombreCliente', sql.NVarChar(50), nombre);
      request.input('MedioContactoCliente', sql.Int, telefono);
      request.input('Fecha', sql.Date, fecha);
      request.input('Nhora', sql.NVarChar(30), hora);
      request.input('Correo', sql.NVarChar(320), correo); 

      request.execute('AgendarCita', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send(`Su cita fue agendada correctamente ${nombre}`);
          enviarCorreoConfirmacion(req.body);
        }
      });
    }
  });
});

app.delete('/eliminar-reservacion', (req, res) => {
  // Obtener los datos enviados en la solicitud
  const { IdCita } = req.body;

  // Conectar a la base de datos y llamar al stored procedure
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('IdCita', sql.Int, IdCita);
     
      request.execute('eliminarCita', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('La cita fue eliminada correctamente');
        }
      });
    }
  });
});

app.delete('/eliminar-servicio/:id', (req, res) => {
  // Obtener el IdServicio de los parámetros de la URL
  const IdServicio = req.params.id;

  // Conectar a la base de datos y llamar al stored procedure
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('IdServicio', sql.Int, IdServicio);
     
      request.execute('eliminarServicio', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('El servicio fue eliminado correctamente');
        }
      });
    }
  });
});


app.delete('/eliminar-producto/:id', (req, res) => {
  // Obtener el IdServicio de los parámetros de la URL
  const idProducto = req.params.id;

  // Conectar a la base de datos y llamar al stored procedure
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('idProducto', sql.Int, idProducto);
     
      request.execute('eliminarProducto', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('El producto fue eliminado correctamente');
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

app.get('/ObtenerServicio', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC ObtenerServicio';  // Llamada al procedimiento almacenado
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

app.get('/ObtenerProducto', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC ObtenerProducto';  // Llamada al procedimiento almacenado
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

app.get('/ObtenerHorasCitasActivas', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC ObtenerHorasCitasActivas';  // Llamada al procedimiento almacenado
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



// Ruta para manejar las solicitudes GET para servicios
app.get('/obtener-servicio', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC GetServicios';  // Llamada al procedimiento almacenado
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


app.get('/ObtenerProductos', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC ObtenerProductos';  // Llamada al procedimiento almacenado
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


app.get('/DiasSolicitados', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC DiasMasSolicitados';  // Llamada al procedimiento almacenado
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

app.get('/ProductosSolicitados', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC ProductosMasSolicitados';  // Llamada al procedimiento almacenado
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


app.get('/ServiciosSolicitados', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'EXEC ServiciosMasSolicitados';  // Llamada al procedimiento almacenado
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

app.post('/insertar-servicios', (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { descripcion, precio, FotoLink } = req.body;

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
      request.input('FotoLink', sql.NVarChar(sql.MAX), FotoLink);

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


app.post('/insertar-productos', (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { NombreProducto, Descripcion, Foto, Precio } = req.body;

  // Conectar a la base de datos y guardar los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();

      // Configurar los parámetros del stored procedure
      request.input('NombreProducto', sql.NVarChar(200), NombreProducto);
      request.input('Descripcion', sql.NVarChar(200), Descripcion);
      request.input('Foto', sql.NVarChar(sql.MAX), Foto);
      request.input('Precio', sql.Money, Precio);

      // Ejecutar el stored procedure
      request.execute('InsertarProducto', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('Se ha guardado el producto');
        }
      });
    }
  });
});

app.put('/editar-reservacion/:id', (req, res) => {
  // Obtener el ID de la reservación a actualizar
  const reservarCitaID = req.params.id;

  // Obtener los datos enviados en la solicitud
  const { nombre, telefono, fecha, hora, servicio, producto, correo, citaActiva } = req.body;

  // Conectar a la base de datos y llamar al stored procedure
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('ReservarCitaID', sql.Int, reservarCitaID);
      request.input('servicio', sql.NVarChar(50), servicio);
      request.input('producto', sql.NVarChar(50), producto);
      request.input('NombreCliente', sql.NVarChar(50), nombre);
      request.input('MedioContactoCliente', sql.Int, telefono);
      request.input('Fecha', sql.Date, fecha);
      request.input('Nhora', sql.NVarChar(30), hora);
      request.input('Correo', sql.NVarChar(320), correo);
      request.input('CitaActiva', sql.Bit, citaActiva);
      request.execute('EditarReservacion', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('La reservación fue actualizada correctamente');
        }
      });
    }
  });
});


app.put('/editar-producto/:id', (req, res) => {
  // Obtener el ID del producto a actualizar
  const productoID = req.params.id;

  // Obtener los datos enviados en la solicitud
  const { nombreProducto, descripcion, foto, precio } = req.body;

  // Conectar a la base de datos y llamar al stored procedure
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('ProductoID', sql.Int, productoID);
      request.input('NombreProducto', sql.NVarChar(200), nombreProducto);
      request.input('Descripcion', sql.NVarChar(200), descripcion);
      request.input('Foto', sql.NVarChar(sql.MAX), foto);
      request.input('Precio', sql.Money, precio);
      request.execute('ActualizarProducto', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('El producto fue actualizado correctamente');
        }
      });
    }
  });
});


app.put('/editar-servicio/:id', (req, res) => {
  // Obtener el ID del producto a actualizar
  const ServicioID = req.params.id;

  // Obtener los datos enviados en la solicitud
  const { descripcion, precio, FotoLink } = req.body;

  // Conectar a la base de datos y llamar al stored procedure
  console.log(FotoLink)
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      request.input('ServicioID', sql.Int, ServicioID);
      request.input('Descripcion', sql.NVarChar(100), descripcion);
      request.input('Precio', sql.Money, precio);
      request.input('FotoLink', sql.NVarChar(sql.MAX), FotoLink);

      request.execute('actualizarServicio', (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('El servicio fue actualizado correctamente');
        }
      });
    }
  });
});


async function enviarCorreoConfirmacion(datos) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // Usar TLS
      auth: {
        user: 'sotofajardo02@outlook.com',
        pass: 'AbyKend0927'
      }
    });

    const correoOptions = {
      from: 'sotofajardo02@outlook.com',
      to: datos.correo,
      subject: 'Confirmación de cita agendada',
      html: `
        <h1>Gracias por agendar tu cita ${datos.nombre}</h1>
        <p>Recorda la fecha y hora</p>
        <ul>
          <li>Fecha: ${datos.fecha}</li>
          <li>Hora: ${datos.hora}</li>
        </ul>
        <p>Te esperamos en la cita.</p>
      `
    };

    await transporter.sendMail(correoOptions);
    console.log('Correo de confirmación enviado');
  } catch (error) {
    console.log(error);
    throw new Error('Ocurrió un error al enviar el correo de confirmación');
  }
}

// Iniciar el servidor Node.js
const port = 3001;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));




