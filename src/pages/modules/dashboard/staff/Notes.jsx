import React, { useEffect, useMemo, useState } from "react";
import { Download, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import conf from "../../../../config/index";

const TeacherBonafideSection = () => {
  /* -------------------- STATE -------------------- */
  const [bonafides, setBonafides] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  /* -------------------- MOCK DATA (FALLBACK) -------------------- */
  const mockBonafides = [
    {
      _id: "6972f20e3898e1e29a2d4161",
      student_id: "6963e1fd857017602a3f878a",
      reason: "Metro Card",
      status: "PENDING",
      created_at: "2026-01-23T03:59:10.466000",
    },
  ];

  /* -------------------- API CALLS -------------------- */
  const fetchPendingBonafides = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${conf.apiBaseUrl}/teachers/bonafide/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setBonafides(data);
    } catch {
      // fallback until backend is stable
      setBonafides(mockBonafides);
    }
  };

  const approveBonafide = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(
        `${conf.apiBaseUrl}/teachers/bonafide/${id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "APPROVED" }),
        }
      );

      // update UI instantly
      setBonafides((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "APPROVED" } : b
        )
      );

      alert("✅ Bonafide approved");
    } catch {
      alert("❌ Approval failed");
    }
  };

  /* -------------------- PDF GENERATION -------------------- */
  const downloadBonafidePDF = (row) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("BONAFIDE CERTIFICATE", 60, 30);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `This is to certify that the student (ID: ${row.student_id})
is a bonafide student of our institute.

Purpose      : ${row.reason}
Approved By  : Teacher / HOD
Date         : ${new Date().toLocaleDateString()}

This certificate is issued for official use only.`,
      20,
      60
    );

    doc.text("Authorized Signatory", 140, 150);
    doc.text("Institute Seal", 20, 150);

    doc.save("Bonafide_Certificate.pdf");
  };

  /* -------------------- EFFECT -------------------- */
  useEffect(() => {
    fetchPendingBonafides();
  }, []);

  /* -------------------- FILTER + PAGINATION -------------------- */
  const filteredData = useMemo(() => {
    return bonafides.filter(
      (b) =>
        b.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bonafides, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Bonafide Requests (Teacher)
        </h1>
        <p className="text-sm text-gray-500">
          Review and approve student bonafide requests
        </p>
      </div>

      {/* SEARCH */}
      <input
        className="mb-4 w-full md:w-96 px-4 py-2 border rounded-lg"
        placeholder="Search by reason or status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs">Reason</th>
              <th className="px-6 py-3 text-center text-xs">Status</th>
              <th className="px-6 py-3 text-center text-xs">Requested On</th>
              <th className="px-6 py-3 text-center text-xs">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((row) => (
              <tr key={row._id} className="border-t">
                <td className="px-6 py-4">{row.reason}</td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center text-sm">
                  {new Date(row.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center space-x-2">
                  {row.status === "PENDING" && (
                    <button
                      onClick={() => approveBonafide(row._id)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </button>
                  )}

                  {row.status === "APPROVED" && (
                    <button
                      onClick={() => downloadBonafidePDF(row)}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 bg-white p-4 rounded shadow">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherBonafideSection;
