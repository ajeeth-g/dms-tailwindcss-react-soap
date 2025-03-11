import { FilePlus2, RefreshCcw, SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import Button from "../components/common/Button";
import DocumentForm from "../components/DocumentForm";
import DocumentTable from "../components/DocumentTable";

const DocumentListPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const modalRefForm = useRef(null);
  const fetchDataRef = useRef(null);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
        <div className="md:col-span-3">
          {/* Global Search Box in the Parent */}
          <label className="input input-bordered input-sm flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Global Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <SearchIcon className="w-4 h-4" />
          </label>
        </div>
        <div className="md:col-span-9 flex justify-end gap-2">
          <Button
            className="btn btn-success btn-sm"
            icon={<FilePlus2 className="h-4 w-4" />}
            onClick={() => modalRefForm.current.showModal()}
            label="Add Document"
          />

          <button
            className="btn btn-square btn-sm"
            onClick={() => fetchDataRef.current && fetchDataRef.current()}
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <DocumentTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        fetchDataRef={fetchDataRef}
      />

      <DocumentForm modalRefForm={modalRefForm} />
    </div>
  );
};

export default DocumentListPage;
