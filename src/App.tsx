import "./App.css";

import { useEffect, useState } from "react";
import { usersApi, type UserDto, type UserInputDto } from "./shared/api";

function App() {
  const [form, setForm] = useState<UserInputDto>({ username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await usersApi.create(form);
      window.location.reload();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserList />
    </div>
  );
}

export default App;

export function UserList() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    usersApi
      .getAll()
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>유저 목록을 불러오는 데 실패했습니다.</p>
    );

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          {u.username} ({u.email})
        </li>
      ))}
    </ul>
  );
}
