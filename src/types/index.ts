export interface FormField {
  id: string;
  name: string;
  prefillSource?: PrefillSource;
}

export interface PrefillSource {
  sourceType: "form" | "global";
  sourceId: string;
  fieldId?: string;
}

export interface FormNode {
  id: string;
  name: string;
  fields: FormField[];
  dependencies: string[];
}

export interface FieldSchemaProperty {
  title?: string;
  type?: string;
  // extend with other properties as needed
}

export interface FormRaw {
  id: string;
  field_schema?: {
    properties: Record<string, FieldSchemaProperty>;
  };
  // other fields if needed
}

export interface NodeRaw {
  id: string;
  data: {
    component_id: string;
    name: string;
    prerequisites?: string[];
  };
}

export interface FormGraphRaw {
  nodes: NodeRaw[];
  forms: FormRaw[];
}

export interface GlobalData {
  key: string;
  label: string;
}
