import { ActivityForm } from "./ActivityForm";
import { ActivityList } from "./ActivityList";
import "./ActivityPage.css";

export function ActivityPage() {
  return (
    <main>
      <h1>Activity Log</h1>
      <ActivityForm />
      <ActivityList />
    </main>
  );
}
