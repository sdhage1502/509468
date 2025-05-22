import type { FormNode } from "../types";

export const getTransitiveDependencies = (
  formId: string,
  allForms: FormNode[]
): FormNode[] => {
  const visited = new Set<string>();
  const result: FormNode[] = [];

  const traverse = (id: string) => {
    const form = allForms.find(f => f.id === id);
    if (!form || visited.has(id)) return;
    visited.add(id);
    form.dependencies.forEach(traverse);
    if (id !== formId) result.push(form);
  };

  traverse(formId);
  return result;
};
