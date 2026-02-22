const BASE_URL =
  process.env.NEXT_PUBLIC_INDEXER_URL ?? "http://localhost:3001";

const TIMEOUT_MS = 8000;

async function fetchWithTimeout(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res;
  } finally {
    clearTimeout(id);
  }
}

export interface HealthResponse {
  status: string;
}

export interface RootResponse {
  root: string;
  leafCount: number;
}

export interface ProofResponse {
  index: number;
  leaf: string;
  proof: string[];
  root: string;
}

export interface LeafResponse {
  index: number;
  commitment: string;
}

export const api = {
  async health(): Promise<HealthResponse> {
    const res = await fetchWithTimeout("/v1/health");
    return res.json();
  },

  async root(): Promise<RootResponse> {
    const res = await fetchWithTimeout("/v1/root");
    return res.json();
  },

  async proof(index: number): Promise<ProofResponse> {
    const res = await fetchWithTimeout(`/v1/proof/${index}`);
    return res.json();
  },

  async leaf(commitment: string): Promise<LeafResponse> {
    const res = await fetchWithTimeout(
      `/v1/leaf/${encodeURIComponent(commitment)}`
    );
    return res.json();
  },

  async leaves(): Promise<LeafResponse[]> {
    const res = await fetchWithTimeout("/v1/leaves");
    return res.json();
  },
};
