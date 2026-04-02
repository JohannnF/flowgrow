import { useEffect, useState } from "react";
import { mockLogs } from "./data/mockLogs";
import "./styles/ActivityLogPage.css";
import "./styles/ActivityLogForm.css";
import "./styles/Session.css";
import "./styles/SessionLogs.css";

export default function ActivityLogPage() {
  const [logs, setLogs] = useState(mockLogs);

  useEffect(() => {
    document.title = "Activity Log";
  }, []);

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
                  // value={title}
                  // onChange={(e) => setTitle(e.target.value)}
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
                    // value={date}
                    // onChange={(e) => setDate(e.target.value)}
                    // disabled={editingLog} className="activity-form__input" />
                  />
                </div>

                <div className="activity-form__group activity-form__group--half">
                  <label className="activity-form__label">Category</label>
                  <select
                    className="activity-form__input"
                    // value={category}
                    // onChange={(e) => setCategory(e.target.value)}
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
                  // value={note}
                  // onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="activity-form__actions">
                <div className="activity-form__row">
                  <button
                    type="button"
                    className="activity-form__button activity-form__button--secondary"
                    // onClick={handleStart}
                    // disabled={isRunning}
                  >
                    Start Session
                  </button>

                  <button
                    type="button"
                    className="activity-form__button activity-form__button--secondary"
                    // onClick={handleEnd}
                    // disabled={!isRunning}
                  >
                    End Session
                  </button>
                </div>

                <button
                  type="button"
                  className="activity-form__button activity-form__button--primary"
                  // onClick={handleNewEntry}
                  // disabled={isRunning}
                >
                  New Entry
                </button>
              </div>
            </form>
          </div>

          <div className="session">
            <div className="session__header">
              <h2 className="session__title">Session</h2>
              <div className="session__status session__status--idle">
                Not Running
              </div>
            </div>

            <div className="session__divider"></div>

            <div className="session__summary">
              <div className="session__summary-row">
                <span className="session__label">Title</span>
                <span className="session__value session__value--empty">
                  Not set
                </span>
              </div>

              <div className="session__summary-row">
                <span className="session__label">Date</span>
                <span className="session__value session__value--empty">
                  Not set
                </span>
              </div>

              <div className="session__summary-row">
                <span className="session__label">Category</span>
                <span className="session__value session__value--empty">
                  Not set
                </span>
              </div>

              <div className="session__summary-row session__summary-row--notes">
                <span className="session__label">Notes</span>
                <p className="session__notes session__notes--empty">
                  No notes yet
                </p>
              </div>
            </div>

            <div className="session__divider"></div>

            <div className="session__row">
              <span className="session__label">Start Time</span>
              <span className="session__value">--:--</span>
            </div>

            <div className="session__row">
              <span className="session__label">End Time</span>
              <span className="session__value">--:--</span>
            </div>

            <div className="session__row">
              <span className="session__label">Duration</span>
              <span className="session__value">00:00:00</span>
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
