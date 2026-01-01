function Recommendation({ data }) {
  if (!data.length) {
    return (
      <div className="recommendation">
        🧠 Add topics to get AI recommendations
      </div>
    );
  }

  const highPriorityPending = data.filter(
    (item) =>
      item.priority === "High" &&
      item.status !== "Completed"
  );

  const completedCount = data.filter(
    (item) => item.status === "Completed"
  ).length;

  let message = "";

  if (highPriorityPending.length > 0) {
    message = `⚡ Focus on "${highPriorityPending[0].topic}" — it’s high priority and not completed yet.`;
  } else if (completedCount === data.length) {
    message = "🎉 Amazing! You’ve completed all your AI topics.";
  } else {
    message = "📈 Keep going! You’re making steady AI learning progress.";
  }

  return (
    <div className="recommendation">
      {message}
    </div>
  );
}

export default Recommendation;
