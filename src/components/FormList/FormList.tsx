import React from "react";
import type { FormNode } from "../../types";

interface Props {
  forms: FormNode[];
  onSelectForm: (form: FormNode) => void;
  selectedFormId?: string;
}

export const FormList: React.FC<Props> = ({ forms, onSelectForm, selectedFormId }) => (
  <aside className="w-80 bg-white shadow-xl rounded-2xl border border-slate-200 overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Forms</h2>
          <p className="text-slate-300 text-sm">{forms.length} available</p>
        </div>
      </div>
    </div>
    
    {/* Form List */}
    <div className="p-4">
      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {forms.map(form => (
          <button
            key={form.id}
            onClick={() => onSelectForm(form)}
            className={`
              group w-full text-left p-4 rounded-xl border transition-all duration-200
              ${
                form.id === selectedFormId
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500 shadow-lg scale-[1.02]"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300 hover:shadow-md text-slate-800"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                ${form.id === selectedFormId ? "bg-white/20" : "bg-slate-200 group-hover:bg-slate-300"}
              `}>
                <svg className={`w-4 h-4 ${form.id === selectedFormId ? "text-white" : "text-slate-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{form.name}</p>
                <p className={`text-sm opacity-75 ${form.id === selectedFormId ? "text-white" : "text-slate-500"}`}>
                  {form.fields?.length || 0} fields
                </p>
              </div>
              {form.id === selectedFormId && (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  </aside>
);