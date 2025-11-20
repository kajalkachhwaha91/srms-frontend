import { Users } from "lucide-react";
import React from "react";

const DataTable = ({
  columns,
  data,
  actions = [],
  currentPage = 1,
  usersPerPage = 5,
  onToggleStatus,
}) => {
  return (
    <div className="w-full overflow-x-auto overflow-y-auto m-w-[500px] rounded-t-2xl shadow-black">
      <table className="min-w-full text-center table-auto bg-[#FFFFFF] rounded-t-2xl overflow-hidden shadow-black">
        <thead >
          <tr className="border-b border-border/50 bg-[#F7F7F7] h-[60px] ">
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 text-black py-3 min-w-[80px] text-sm sm:text-sm font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="border-b border-border/50 hover:bg-blue-50  transition-colors duration-200 group "
              >
                {columns.map((col, colIndex) => {
                  const value = row[col.field];

                  if (col.field === "banner") {
                    return (
                      <td key={colIndex} className="px-4 py-3 align-middle">
                        {" "}
                        <div className="flex justify-center">
                          <img
                            src={value}
                            alt={row.name}
                            className="w-24 sm:w-32 md:w-48 object-cover rounded-md shadow-sm "
                          />
                        </div>
                        {col.render(row)}
                      </td>
                    );
                  }

                  if (col.field === "status" || col.field === "isActive") {
                    const displayValue =
                      value === true
                        ? "Active"
                        : value === false
                        ? "Blocked"
                        : value;

                    return (
                      <td key={colIndex} className="px-4 py-3 align-middle">
                        <span
                          onClick={() => onToggleStatus?.(row)}
                          className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium cursor-pointer hover:scale-105 transition-transform ${
                            displayValue === "Present" ||
                            displayValue === "Approved" ||
                            displayValue === "Paid" ||
                            displayValue === "Paid" ||
                            displayValue === "Confirmed" ||
                            displayValue === "Ongoing" ||
                            displayValue === "Shown"
                              ? "bg-green-100 text-green-700"
                              : displayValue === "Absent" ||
                                displayValue === "Upcoming" ||
                                displayValue === "Blocked" ||
                                displayValue === "Created"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {displayValue}
                        </span>
                      </td>
                    );
                  }

                  if (col.field === "action") {
                    return (
                      <td key={colIndex} className="px-4 py-3 align-middle">
                        <div className="flex gap-2 sm:gap-1 justify-center ">
                          {actions.map((action, idx) => {
                            const isDisabledAction =
                              action.disableCondition?.(row) || false;

                            // Case 1: Custom render
                            if (action.render) {
                              return (
                                <React.Fragment key={idx}>
                                  {action.render(row)}
                                </React.Fragment>
                              );
                            }

                            // Case 2: Icon-only
                            if (action.icon && !action.label) {
                              const iconElement =
                                typeof action.icon === "function"
                                  ? action.icon(row)
                                  : action.icon;
                              return (
                                <button
                                  key={idx}
                                  title={action.title || ""}
                                  className={`p-2 rounded transition ${
                                    isDisabledAction
                                      ? "cursor-not-allowed opacity-40"
                                      : "hover:bg-blue-100 hover:text-[#004AAD]"
                                  }`}
                                  onClick={() =>
                                    !isDisabledAction && action.onClick?.(row)
                                  }
                                  disabled={isDisabledAction}
                                  type="button"
                                >
                                  {iconElement}
                                </button>
                              );
                            }

                            // Case 3: Label button (e.g., "Pay Amount")
                            return (
                              <button
                                key={idx}
                                title={action.title || ""}
                                className={`flex items-center gap-2 px-3 py-1 rounded text-sm sm:text-sm transition
        ${action.className || "bg-gray-200 text-black hover:bg-gray-300"}
        ${isDisabledAction ? "opacity-40 cursor-not-allowed" : ""}
      `}
                                onClick={() =>
                                  !isDisabledAction && action.onClick?.(row)
                                }
                                disabled={isDisabledAction} // ✅ Critical for accessibility & form behavior
                                type="button"
                              >
                                {action.icon && (
                                  <span className="flex items-center">
                                    {action.icon}
                                  </span>
                                )}
                                {action.label && (
                                  <span className="text-[16px]">
                                    {action.label}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    );
                  }

                  // Add here column fields that need text wrapping like address
                  return (
                    <td
                      key={colIndex}
                      className={`px-4 py-3 align-middle ${
                        col.field === "address" ||
                        col.field === "firstAddress" ||
                        col.field === "fullAddress"
                          ? "whitespace-normal break-words text-center truncate max-w-[200px]"
                          : ""
                      }`}
                    >
                      {col.render
                        ? col.render(row) // ✅ use custom render if provided
                        : col.field === "srNo"
                        ? (currentPage - 1) * usersPerPage + rowIndex + 1
                        : [
                            "createdAt",
                            "updatedAt",
                            "startDate",
                            "endDate",
                            "expireDate",
                            "payoutDate",
                            "date",
                          ].includes(col.field)
                        ? (() => {
                            if (
                              typeof value === "string" &&
                              value.includes("/")
                            ) {
                              const [day, month, year] = value.split("/");
                              return new Date(
                                `${year}-${month}-${day}`
                              ).toLocaleDateString("en-GB");
                            }
                            const d = new Date(value);
                            return d.toLocaleDateString("en-GB") || "-";
                          })()
                        : value !== undefined && value !== null && value !== ""
                        ? value
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-12">
                <div className="text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg sm:text-sm font-medium">
                    No data found
                  </p>
                  <p className="text-sm">
                    Try adjusting your search or filters
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
