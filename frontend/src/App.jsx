import { useEffect, useState } from "react";
import api from "./api.js";
import Form from "./components/form.jsx";
import List from "./components/list.jsx";
import Recommendation from "./components/Recommendation.jsx";
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    topic: "",
    status: "Not Started",
    difficulty: "Easy",
    priority: "Low",
    notes: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get("/topics");
    setData(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.topic) return;

    if (editId) {
      await api.put(`/topics/${editId}`, form);
      setEditId(null);
    } else {
      await api.post("/topics", form);
    }

    setForm({
      topic: "",
      status: "Not Started",
      difficulty: "Easy",
      priority: "Low",
      notes: ""
    });

    fetchData();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
  };

  const handleDelete = async (id) => {
    await api.delete(`/topics/${id}`);
    fetchData();
  };

  return (
    <div className="container">
      <h2>🧠 AI Learning Intelligence Dashboard</h2>
      <p className="ai-thinking">🤖 AI is analyzing your learning patterns…</p>

      <Recommendation data={data} />

      <Form
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={!!editId}
      />

      <List
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
