function Form({ form, onChange, onSubmit, isEdit }) {
  return (
    <div className="form-group">

      <input
        type="text"
        name="topic"
        placeholder="AI Topic"
        value={form.topic}
        onChange={onChange}
      />

      <select name="status" value={form.status} onChange={onChange}>
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <select name="difficulty" value={form.difficulty} onChange={onChange}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <select name="priority" value={form.priority} onChange={onChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={onChange}
      />

      <button className="primary" onClick={onSubmit}>
        {isEdit ? "Update" : "Add"}
      </button>

    </div>
  );
}

export default Form;
