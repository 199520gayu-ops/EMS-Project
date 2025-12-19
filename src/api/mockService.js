import axios from "axios";

export const fetchDummyUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data.map((u) => ({
      id: String(u.id),
      name: u.name,
      email: u.email,
      password: "password", // default
      role: "Employee",
    }));
  } catch (e) {
    return [];
  }
};