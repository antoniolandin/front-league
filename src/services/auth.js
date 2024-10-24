export function getStoredUsers() {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function registerUser(name, email, password) {
  let users = getStoredUsers();

  if (users.some((user) => user.email === email)) {
    return { success: false, message: "El email ya está registrado" };
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    password,
  };

  users.push(newUser);

  saveUsers(users);

  return { success: true, message: "Usuario registrado exitosamente" };
}

export function loginUser(email, password) {
  const users = getStoredUsers();

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (user) {
    return { success: true, message: "Inicio de sesión exitoso", user }; 
  } else {
    return { success: false, message: "Email o contraseña incorrectos" };
  }
}
