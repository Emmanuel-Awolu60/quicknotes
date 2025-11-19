import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Notes Section (empty for now) */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Notes</h2>

          <p className="text-gray-500">No notes yet. Start by creating one!</p>
        </div>
      </div>
    </div>
  );
}
