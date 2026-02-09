import "./ActivityList.css";
import { ActivityItem } from "./ActivityItem";
// import { EmptyState } from "./EmptyState";

export function ActivityList() {
  return (
    <section>
      <h2>Activity List</h2>

      {/* <EmptyState /> */}

      <ActivityItem />
    </section>
  );
}
