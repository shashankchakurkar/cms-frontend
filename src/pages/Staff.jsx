import { useEffect, useState } from "react";
import {
  getAllStaff,
  createStaff,
} from "../api/staffApi";

import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "TEACHER",
  status: "ACTIVE",
};

export default function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const [editId, setEditId] = useState(null);

  // ---------------- LOAD ----------------
  const loadStaff = async () => {
    const res = await getAllStaff();
    setStaffList(res.data);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- OPEN ADD ----------------
  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
  };

  // ---------------- OPEN EDIT ----------------
  const openEdit = (staff) => {
    setForm(staff);
    setEditId(staff.id);
    setShowModal(true);
  };

  // ---------------- SAVE (ADD OR UPDATE) ----------------
  const handleSave = async () => {
    if (editId) {
      await updateStaff(editId, form);
    } else {
      await createStaff(form);
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditId(null);
    loadStaff(); // 🔥 refresh list
  };

  // ---------------- FILTER ----------------
  const filtered = staffList.filter((s) =>
    (s.firstName + s.lastName + s.email + s.employeeCode)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Staff</h1>
          <p className="text-gray-500">Manage staff members</p>
        </div>

        <button
          onClick={openAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center border p-2 rounded">
        <Search size={18} />
        <input
          className="ml-2 w-full outline-none"
          placeholder="Search staff..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.employeeCode}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.role}</td>

              <td className="flex gap-2 p-2">
                <Eye size={16} />
                <Edit
                  size={16}
                  className="text-green-600 cursor-pointer"
                  onClick={() => openEdit(s)}
                />
                <UserPlus size={16} />
                <Trash2 size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-5 rounded w-[400px] space-y-3">

            <div className="flex justify-between">
              <h2 className="text-lg font-bold">
                {editId ? "Edit Staff" : "Add Staff"}
              </h2>

              <X
                className="cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 w-full rounded"
            />

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 w-full rounded"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 w-full rounded"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 w-full rounded"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="TEACHER">Teacher</option>
              <option value="COORDINATOR">Coordinator</option>
              <option value="ADMIN_STAFF">Admin Staff</option>
            </select>

            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white w-full py-2 rounded"
            >
              {editId ? "Update Staff" : "Save Staff"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}