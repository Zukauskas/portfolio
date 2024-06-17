import TaskBar from "./task-bar/TaskBar";

export function LandingPage() {
  return (
    <>
      <div className="bg-desktop bg-cover bg-center min-h-screen flex">
        <TaskBar />
      </div>
    </>
  );
}
