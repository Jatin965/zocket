import ReportCanvas from "../components/ReportCanvas";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Report Canvas */}
      <ReportCanvas />
    </div>
  );
}
