import axios from "axios";
import { parseGraph } from "../utlis/parseGraph";
import type { FormNode, FormGraphRaw } from "../types";

const API_URL = "http://localhost:3000/api/v1/tenant123/actions/blueprints/blueprint456/graph/";

export const fetchFormGraph = async (): Promise<FormNode[]> => {
  const response = await axios.get<FormGraphRaw>(API_URL);
  return parseGraph(response.data);
};
