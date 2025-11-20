import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";

const PagePath2 = ({
  title,
  searchTerm,
  handleSearchTerm,
  showSearch,
  showAddButton,
  addButtonText,
  showExtraButton,
  extraButtonText,
  optionsLoading = false,
  onClick,
  onExtraClick,
  inputType = "text",
  placeholder = "Search Here",
  showSelect,
  options = ["Pending", "Approved", "Rejected"],
  selectPlaceHolder = "Select Status",
  onChangeSelectFunc,
  disabled = false,
}) => {
  return (
    <div className="bg-white p-4 mb-4 border-b rounded-2xl shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold flex-shrink-0">{title}</h2>

        {showSearch && (
          <div className="flex items-center flex-1 min-w-[200px] bg-white border border-gray-300 rounded-lg px-3 py-[8.8px]">
            {/* Icon */}
            <IoSearchOutline className="w-5 h-5 text-gray-400" />

            {/* Vertical line */}
            <div className="h-5 w-px bg-gray-300 mx-2"></div>

            {/* Input */}
            <input
              type={inputType}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearchTerm}
            />
          </div>
        )}

        {showSelect && (
          <Select
            options={options?.map((status) => ({
              label: status,
              value: status,
            }))}
            isLoading={optionsLoading}
            placeholder={selectPlaceHolder}
            onChange={onChangeSelectFunc}
            isClearable
            isDisabled={disabled}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderRadius: "0.5rem",
                borderColor: state.isFocused ? "#FF6B00" : "#d1d5db",
                boxShadow: state.isFocused ? "0 0 0 1px #FF6B00" : "none",
                "&:hover": { borderColor: "#FF6B00" },
                fontSize: "0.875rem",
                minHeight: "40px",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                zIndex: 9999,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#FF6B00"
                  : state.isFocused
                    ? "#FFE5D1"
                    : "white",
                color: state.isSelected ? "white" : "black",
                "&:active": { backgroundColor: "#FF6B00", color: "white" },
              }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
            }}
          />
        )}
        <div className="flex items-center gap-3">
          {showAddButton && addButtonText && (
            <button
              className={`bg-[#CCA547] text-white px-6 py-[8.8px] rounded-xl 
              flex justify-center items-center gap-2 cursor-pointer 
              font-medium shadow-md 
              transition duration-300
              ${disabled
                  ? "bg-gray-400 cursor-not-allowed opacity-60"
                  : "hover:bg-[#CCA547]/90 hover:shadow-lg"
                }`}
              onClick={disabled ? undefined : onClick}
              disabled={disabled}
              title={disabled ? "No permission to create" : "Create"}
            >
              {addButtonText}
            </button>
          )}
          {showExtraButton && extraButtonText && (
            <button
              className={`bg-[#CCA547] text-white px-6 py-[8.8px] rounded-xl 
              flex justify-center items-center gap-2 cursor-pointer 
              font-medium shadow-md 
              transition duration-300
              ${disabled
                  ? "bg-gray-400 cursor-not-allowed opacity-60"
                  : "hover:bg-[#CCA547]/90 hover:shadow-lg"
                }`}
              onClick={disabled ? undefined : onExtraClick}
              disabled={disabled}
              title={disabled ? "No permission to create" : "Create"}
            >
              {extraButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagePath2;
