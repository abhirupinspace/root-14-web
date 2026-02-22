export interface Project {
  id: string;
  name: string;
  network: "testnet" | "mainnet";
  apiKey: string;
  testApiKey: string;
  createdAt: string;
  circuits: string[];
}
