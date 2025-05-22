import type { FormGraphRaw, FormNode, FormField, FormRaw, FieldSchemaProperty } from "../types";

export const parseGraph = (raw: FormGraphRaw): FormNode[] => {
  // Map from form id to FormRaw (typed)
  const formMap = new Map<string, FormRaw>();

  raw.forms.forEach(f => formMap.set(f.id, f));

  return raw.nodes.map(node => {
    const compId = node.data.component_id;
    const form = formMap.get(compId);

    // Extract fields from the form's field_schema.properties if available
    const fields: FormField[] = form?.field_schema?.properties
      ? Object.entries(form.field_schema.properties).map(
          ([key, value]: [string, FieldSchemaProperty]) => ({
            id: key,
            name: value.title || key
          })
        )
      : [];

    return {
      id: node.id,
      name: node.data.name,
      dependencies: node.data.prerequisites || [],
      fields,
    };
  });
};
