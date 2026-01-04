import { useEffect, useState } from "react";
import Form from "./components/form.jsx";
import List from "./components/list.jsx";
import Recommendation from "./components/Recommendation.jsx";
import "./index.css";

/* ===============================
   Local Storage Helpers
================================ */
const STORAGE_KEY = "ai-learning-topics";

const loadTopics = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveTopics = (topics) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
};

/* ===============================
   App Component
================================ */
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

  /* Load data once on app start */
  useEffect(() => {
    setData(loadTopics());
  }, []);

  /* Handle form input change */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* Add / Update topic */
  const handleSubmit = () => {
    if (!form.topic) return;

    let updatedData;

    if (editId) {
      updatedData = data.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setEditId(null);
    } else {
      const newItem = {
        ...form,
        id: Date.now()
      };
      updatedData = [...data, newItem];
    }

    setData(updatedData);
    saveTopics(updatedData);

    setForm({
      topic: "",
      status: "Not Started",
      difficulty: "Easy",
      priority: "Low",
      notes: ""
    });
  };

  /* Edit topic */
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
  };

  /* Delete topic */
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    saveTopics(updatedData);
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
