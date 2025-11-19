export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">QuickNotes</h2>

      <nav className="flex flex-col gap-4">
        <button className="text-left hover:text-gray-300">Dashboard</button>
        <button className="text-left hover:text-gray-300">Notes</button>
        <button className="text-left hover:text-gray-300">Profile</button>
      </nav>
    </div>
  );
}
