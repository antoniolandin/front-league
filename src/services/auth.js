function showAlertWithErrors(errorResponse) {
  if (errorResponse && errorResponse.error) {
    const errorMessages = errorResponse.error.map((error) => error.msg);

    const alertMessage = errorMessages.join("\n");

    return alertMessage;
  }
}
export async function registrarUsuario(nombre, email, contraseña) {
  const response = await fetch("http://localhost:3500/api/usuarios/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      email,
      contraseña,
    }),
  });

  const data = await response.json();
  console.log(data);
  console.log(response.status);

  if (
    response.status === 400 ||
    response.status === 403 ||
    response.status === 404
  ) {
    alert(data.msg || showAlertWithErrors(data));
  } else {
    alert("Usuario registrado con éxito");
  }
}

export async function loginUsuario(email, contraseña) {
  const response = await fetch("http://localhost:3500/api/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      contraseña,
    }),
  });

  const data = await response.json();
  console.log(data);
  console.log(response.status);

  if (
    response.status === 400 ||
    response.status === 403 ||
    response.status === 404
  ) {
    alert(data.msg || showAlertWithErrors(data));
  } else {
    alert("Usuario autorizado");
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "nombreUsuario",
      JSON.stringify(data.usuario.id && data.usuario.nombre),
    );
    localStorage.setItem(
      "idUsuario",
      parseInt(JSON.stringify(data.usuario.id)),
    );
  }
}
