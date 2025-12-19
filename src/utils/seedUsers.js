export const seedDefaultAdmin = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const adminExist = users.some((u) => u.role === "admin");

  if (!adminExist) {
    const admin = {
      id: Date.now(),
      name: "Super Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    };

    users.push(admin);
    localStorage.setItem("users", JSON.stringify(users));
  }
};

 