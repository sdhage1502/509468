import React, { useEffect, useState } from "react";
import { fetchFormGraph } from "./api/formApi";
import type { FormNode, PrefillSource } from "./types";
import { FormList } from "./components/FormList/FormList";
import { PrefillConfig } from "./components/PrefillConfig/prefillConfig";

const App: React.FC = () => {
  const [forms, setForms] = useState<FormNode[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormNode | null>(null);

  useEffect(() => {
    fetchFormGraph().then(setForms);
  }, []);

  const updatePrefill = (fieldId: string, source?: PrefillSource) => {
    if (!selectedForm) return;

    setForms((prev) =>
      prev.map((f) =>
        f.id === selectedForm.id
          ? {
              ...f,
              fields: f.fields.map((field) =>
                field.id === fieldId ? { ...field, prefillSource: source } : field
              ),
            }
          : f
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row p-6 gap-6">
      <FormList forms={forms} onSelectForm={setSelectedForm} selectedFormId={selectedForm?.id} />
      <main className="flex-1 bg-white rounded-md shadow-md p-6">
        {selectedForm ? (
          <PrefillConfig form={selectedForm} allForms={forms} onUpdatePrefill={updatePrefill} />
        ) : (
          <div className="text-gray-500 text-center mt-20">
            Select a form to configure prefill settings
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
