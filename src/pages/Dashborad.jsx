import Layout from "../components/Layout";
export default function DashboardCards() {
  return (
    <Layout>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Total Employees */}
      <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
        <div className="text-sm text-gray-500">Total Employees</div>
        <div className="text-3xl font-semibold mt-2">128</div>
        <div className="mt-3 flex items-center text-green-600 text-sm">
          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
          Active workforce
        </div>
      </div>

      {/* Attendance Today */}
      <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
        <div className="text-sm text-gray-500">Attendance Today</div>
        <div className="text-3xl font-semibold mt-2">93%</div>
        <div className="mt-3 flex items-center text-blue-600 text-sm">
          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
          +5% from yesterday
        </div>
      </div>

      {/* Pending Leave Requests */}
      <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
        <div className="text-sm text-gray-500">Pending Leave Requests</div>
        <div className="text-3xl font-semibold mt-2">14</div>
        <div className="mt-3 flex items-center text-yellow-600 text-sm">
          <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
          Awaiting approval
        </div>
      </div>

      {/* Payroll Processing */}
      <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
        <div className="text-sm text-gray-500">Payroll Processing</div>
        <div className="text-3xl font-semibold mt-2">₹8.3L</div>
        <div className="mt-3 flex items-center text-purple-600 text-sm">
          <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
          This month
        </div>
      </div>

    </div>
    </Layout>
  );
}

