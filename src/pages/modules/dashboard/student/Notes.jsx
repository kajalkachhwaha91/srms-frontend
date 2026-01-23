import React, { useState, useMemo } from "react";
import { Download, FileText } from "lucide-react";
import conf from "../../../../config/index";
import jsPDF from "jspdf";

const BonafideSection = () => {
  /* -------------------- STATE -------------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------------------- MOCK DATA (UNTIL GET API) -------------------- */
  const bonafides = [
    {
      id: 1,
      reason: "Metro Card",
      status: "Pending",
      requestedOn: "2024-03-12",
    },
    {
      id: 2,
      reason: "Education Loan",
      status: "Approved",
      requestedOn: "2024-02-25",
      fileUrl: "/bonafide/sample.pdf",
    },
  ];

  /* -------------------- API CALL -------------------- */
  const requestBonafide = async (reason) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${conf.apiBaseUrl}/students/bonafide/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      },
    );

    if (!response.ok) {
      throw new Error("Bonafide request failed");
    }

    return response.json();
  };

  const downloadBonafidePDF = (row) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("BONAFIDE CERTIFICATE", 60, 30);

    // Body text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(
      `This is to certify that the student is a bonafide student of our institute.

Purpose       : ${row.reason}
Status        : ${row.status}
Requested On  : ${row.requestedOn}

This certificate is issued for official use only.`,
      20,
      60,
    );

    // Footer
    doc.text("Authorized Signatory", 140, 140);
    doc.text("Institute Seal", 20, 140);

    // Save PDF
    doc.save("Bonafide_Certificate.pdf");
  };

  /* -------------------- HANDLERS -------------------- */
  const handleBonafideRequest = async () => {
    if (!reason.trim()) {
      alert("Please enter reason");
      return;
    }

    setLoading(true);
    try {
      await requestBonafide(reason);
      alert("✅ Bonafide request submitted successfully");
      setReason("");
    } catch (err) {
      alert("❌ Failed to submit bonafide request");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- FILTER + PAGINATION -------------------- */
  const filteredData = useMemo(() => {
    return bonafides.filter(
      (item) =>
        item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [bonafides, searchTerm]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Bonafide Certificate
        </h1>
        <p className="text-sm text-gray-500">
          Request and download bonafide certificates
        </p>
      </div>

      {/* REQUEST SECTION */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Request Bonafide
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter reason (e.g. Metro card, Bank loan)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3 text-sm"
          />

          <button
            onClick={handleBonafideRequest}
            disabled={loading}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Request"}
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-cyan-500">
          <p className="text-sm text-gray-600">Total Requests</p>
          <p className="text-2xl font-bold text-gray-800">{bonafides.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Filtered Results</p>
          <p className="text-2xl font-bold text-gray-800">
            {filteredData.length}
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by reason or status..."
          className="w-full md:w-96 px-4 py-2 border rounded-lg text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Reason
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600">
                Requested On
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  No bonafide requests found
                </td>
              </tr>
            ) : (
              currentItems.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 font-medium">{row.reason}</td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {row.requestedOn}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {row.status === "Approved" ? (
                      <button
                        onClick={() => downloadBonafidePDF(row)}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Not Available
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow">
          <span className="text-sm text-gray-600">
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

export default BonafideSection;
