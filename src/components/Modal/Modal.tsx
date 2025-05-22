import React from "react";
import type { FormNode, PrefillSource, GlobalData } from "../../types";
import { getTransitiveDependencies } from "../../utlis/graphUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  form: FormNode;
  allForms: FormNode[];
  globalData: GlobalData[];
  onSelect: (source: PrefillSource) => void;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, form, allForms, globalData, onSelect }) => {
  if (!isOpen) return null;

  const upstream = getTransitiveDependencies(form.id, allForms);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Select Prefill Source</h3>
                <p className="text-blue-100 text-sm">Choose a data source for this field</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Upstream Forms */}
          {upstream.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h4 className="text-lg font-semibold text-slate-800">Form Fields</h4>
              </div>
              <div className="space-y-4">
                {upstream.map(f => (
                  <div key={f.id} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                      <h5 className="font-semibold text-slate-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {f.name}
                      </h5>
                    </div>
                    <div className="p-2">
                      {f.fields.map(field => (
                        <button
                          key={field.id}
                          onClick={() => onSelect({ sourceType: "form", sourceId: f.id, fieldId: field.id })}
                          className="group w-full text-left p-3 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 group-hover:text-blue-800">{field.name}</p>
                              <p className="text-sm text-slate-500">ID: {field.id}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Global Data */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              <h4 className="text-lg font-semibold text-slate-800">Global Data</h4>
            </div>
            <div className="bg-purple-50 rounded-xl border border-purple-200 p-2">
              {globalData.map(d => (
                <button
                  key={d.key}
                  onClick={() => onSelect({ sourceType: "global", sourceId: d.key })}
                  className="group w-full text-left p-3 rounded-lg hover:bg-purple-100 hover:border-purple-300 border border-transparent transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-purple-800">{d.label}</p>
                      <p className="text-sm text-slate-500">Key: {d.key}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex justify-end">
            <button 
              onClick={onClose} 
              className="flex items-center gap-2 px-6 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};