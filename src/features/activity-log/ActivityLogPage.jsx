import { useEffect, useState } from "react";
import "./styles/ActivityLogPage.css";
import "./styles/ActivityLogForm.css";
import "./styles/Session.css";
import "./styles/SessionLogs.css";

export default function ActivityLogPage() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    note: "",
  });
  const [session, setSession] = useState({
    title: "",
    date: "",
    category: "",
    note: "",
    startTime: "",
    endTime: "",
    duration: "",
    startMs: null,
    status: "Idle",
    isRunning: false,
  });
  useEffect(() => {
    document.title = "Activity Log";
  }, []);

  function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function pad(num) {
    return num.toString().padStart(2, "0");
  }

  function handleStart() {
    const now = new Date();

    const startedSession = {
      title: form.title,
      date: form.date,
      category: form.category,
      note: form.note,
      startTime: now.toLocaleTimeString(),
      endTime: "",
      duration: "",
      startMs: now.getTime(),
      status: "Running",
      isRunning: true,
    };

    console.log("Started session:", startedSession);
    setSession(startedSession);
  }

  function handleEnd() {
    const now = new Date();
    const endTimeValue = now.toLocaleTimeString();
    const endMilliseconds = now.getTime();

    let finalDuration = "";

    if (session.startMs) {
      const diff = endMilliseconds - session.startMs;
      finalDuration = formatDuration(diff);
    }

    const completedSession = {
      ...session,
      id: session.id || crypto.randomUUID(),
      title: form.title,
      date: form.date,
      category: form.category,
      notes: form.note,
      endTime: endTimeValue,
      duration: finalDuration,
      status: "Completed",
      isRunning: false,
      createdAt: session.createdAt || now.toISOString(),
      completedAt: now.toISOString(),
    };

    console.log("Completed session:", completedSession);

    setSession(completedSession);
    setLogs((prevLogs) => [completedSession, ...prevLogs]);
  }

  function handleClearEntry() {
    setForm({
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      note: "",
    });

    setSession({
      id: "",
      title: "",
      date: "",
      category: "",
      note: "",
      startTime: "",
      endTime: "",
      duration: "",
      startMs: null,
      status: "Idle",
      isRunning: false,
      createdAt: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <>
      <main className="activity-log-page">
        <div className="activity-log-page__header">
          <h1 className="activity-log-page__title">Activity Log</h1>
          <p className="activity-log-page__subtitle">
            Track your focus sessions and progress
          </p>
        </div>
        <div className="activity-log">
          <div className="activity-form">
            <form onSubmit={null}>
              <h2 className="activity-form__title">Log Activity</h2>
              <div className="activity-form__divider"></div>

              <div className="activity-form__group">
                <label className="activity-form__label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="activity-form__input"
                  placeholder="What are you focusing on?"
                />
              </div>

              <div className="activity-form__row">
                <div className="activity-form__group activity-form__group--half">
                  <label className="activity-form__label">Date</label>
                  <input
                    type="date"
                    className="activity-form__input"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    disabled={true}
                  />
                </div>

                <div className="activity-form__group activity-form__group--half">
                  <label className="activity-form__label">Category</label>
                  <select
                    className="activity-form__input"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Coding">Coding</option>
                    <option value="Learning">Learning</option>
                    <option value="Reading">Reading</option>
                    <option value="Workout">Workout</option>
                  </select>
                </div>
              </div>

              <div className="activity-form__group">
                <label className="activity-form__label">Notes</label>
                <textarea
                  className="activity-form__input activity-form__textarea"
                  placeholder="Write what you did or what you have learned..."
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                />
              </div>

              <div className="activity-form__actions">
                <div className="activity-form__row">
                  <button
                    type="button"
                    className="activity-form__button activity-form__button--secondary"
                    onClick={handleStart}
                    disabled={
                      session.isRunning || session.status === "Completed"
                    }
                  >
                    Start Session
                  </button>

                  <button
                    type="button"
                    className="activity-form__button activity-form__button--secondary"
                    onClick={handleEnd}
                    disabled={!session.isRunning}
                  >
                    End Session
                  </button>
                </div>

                <button
                  type="button"
                  className="activity-form__button activity-form__button--primary"
                  onClick={handleClearEntry}
                  disabled={session.status === "Idle"}
                >
                  {session.status === "Running" ? "Cancel" : "Clear Entry"}
                </button>
              </div>
            </form>
          </div>

          <div className="session">
            <div className="session__header">
              <h2 className="session__title">Session</h2>
              <div className="session__status session__status--idle">
                {session.status || "Not Running"}
              </div>
            </div>

            <div className="session__divider"></div>

            <div className="session__summary">
              <div className="session__summary-row">
                <span className="session__label">Title</span>
                <span className="session__value session__value--empty">
                  {session.title || "Not set"}
                </span>
              </div>

              <div className="session__summary-row">
                <span className="session__label">Date</span>
                <span className="session__value session__value--empty">
                  {session.date || "Not set"}
                </span>
              </div>

              <div className="session__summary-row">
                <span className="session__label">Category</span>
                <span className="session__value session__value--empty">
                  {session.category || "Not set"}
                </span>
              </div>

              <div className="session__summary-row session__summary-row--notes">
                <span className="session__label">Notes</span>
                <p className="session__notes session__notes--empty">
                  {session.notes || "Not notes yet"}
                </p>
              </div>
            </div>

            <div className="session__divider"></div>

            <div className="session__row">
              <span className="session__label">Start Time</span>
              <span className="session__value">
                {session.startTime || "--:--"}
              </span>
            </div>

            <div className="session__row">
              <span className="session__label">End Time</span>
              <span className="session__value">
                {session.endTime || "--:--"}
              </span>
            </div>

            <div className="session__row">
              <span className="session__label">Duration</span>
              <span className="session__value">
                {session.duration || "00:00:00"}
              </span>
            </div>
          </div>
        </div>

        <div className="session-logs">
          <h2 className="session-logs__title">Session Logs</h2>

          <div className="session-logs__table-wrapper">
            <table className="session-logs__table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Notes</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Completed At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="session-logs__empty">
                      No sessions yet
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.title}</td>
                      <td>{log.date}</td>
                      <td>{log.category}</td>
                      <td>
                        {log.notes.length > 30
                          ? `${log.notes.slice(0, 30)}...`
                          : log.notes}
                      </td>
                      <td>{log.startTime}</td>
                      <td>{log.endTime}</td>
                      <td>{log.duration}</td>
                      <td>
                        <span
                          className={`session-status session-status--${log.status.toLowerCase()}`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td>{new Date(log.createdAt).toLocaleString()}</td>
                      <td>{new Date(log.completedAt).toLocaleString()}</td>
                      <td className="session-logs__actions">
                        <button className="session-logs__button session-logs__button--danger">
                          Delete
                        </button>
                        <button className="session-logs__button session-logs__button--secondary">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
