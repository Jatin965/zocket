import ReportCanvas from "../components/ReportCanvas";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Report Canvas */}
      <ReportCanvas />
    </div>
  );
}
