export default function validateData(values) {
	let errors = {};
  
	if (!values.email) {
	  errors.email = 'Debe ingresar un email';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
	  errors.email = 'El email ingresado es invalido';
	}
	if (!values.password) {
	  errors.password = 'Una contraseña es requerida';
	} else if (values.password.length < 6) {
	  errors.password = 'La contraseña debe tener mas de 6 caracteres';
	}
  
	return errors;
  }