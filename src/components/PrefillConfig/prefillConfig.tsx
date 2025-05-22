import React, { useState } from "react";
import type { FormNode, FormField, PrefillSource } from "../../types";
import { Modal } from "../Modal/Modal";

interface Props {
  form: FormNode;
  allForms: FormNode[];
  onUpdatePrefill: (fieldId: string, source?: PrefillSource) => void;
}

export const PrefillConfig: React.FC<Props> = ({ form, allForms, onUpdatePrefill }) => {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (field: FormField) => {
    setSelectedField(field);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Configure Prefill</h2>
              <p className="text-slate-600 text-sm">Form: {form.name}</p>
            </div>
          </div>
        </div>

        {/* Fields Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Field Configuration
            </h3>
            <p className="text-slate-600 text-sm mt-1">Configure prefill sources for each field</p>
          </div>
          
          <div className="divide-y divide-slate-100">
            {form.fields.map((field) => (
              <div key={field.id} className="p-6 hover:bg-slate-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{field.name}</h4>
                      <p className="text-sm text-slate-500">Field ID: {field.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {field.prefillSource ? (
                      <div className="flex items-center gap-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-green-800">
                              {field.prefillSource.sourceType === "form"
                                ? `Form ${field.prefillSource.sourceId}.${field.prefillSource.fieldId}`
                                : `Global: ${field.prefillSource.sourceId}`}
                            </span>
                          </div>
                        </div>
                        <button
                          aria-label={`Remove prefill for ${field.name}`}
                          className="group p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                          onClick={() => onUpdatePrefill(field.id)}
                        >
                          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        aria-label={`Set prefill for ${field.name}`}
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        onClick={() => openModal(field)}
                      >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="font-medium">Set Prefill</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedField && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            form={form}
            allForms={allForms}
            globalData={[
              { key: "client_name", label: "Client Name" },
              { key: "organization_id", label: "Organization ID" },
            ]}
            onSelect={(source: PrefillSource) => {
              onUpdatePrefill(selectedField.id, source);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
