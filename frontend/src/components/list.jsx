function List({ data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>🧠 Topic</th>
          <th>Status</th>
          <th>Difficulty</th>
          <th>Priority</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.topic}</td>

            <td>
              <span className={`status ${item.status}`}>
                {item.status}
              </span>
            </td>

            <td>{item.difficulty}</td>
            <td><strong>{item.priority}</strong></td>
            <td>{item.notes || "—"}</td>

            <td>
              <button className="edit" onClick={() => onEdit(item)}>
                ✏️ Edit
              </button>
              <button className="delete" onClick={() => onDelete(item.id)}>
                🗑 Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
