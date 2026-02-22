"use client";

import { useState, useEffect, useCallback } from "react";
import {
  isConnected,
  requestAccess,
  getAddress,
  getNetworkDetails,
} from "@stellar/freighter-api";

const STORAGE_KEY = "r14_wallet";
const CONNECT_TIMEOUT_MS = 15_000;

interface FreighterState {
  address: string | null;
  network: string | null;
  networkPassphrase: string | null;
  isFreighterInstalled: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  clearError: () => void;
}

export function useFreighter(): FreighterState {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [networkPassphrase, setNetworkPassphrase] = useState<string | null>(null);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { address: a, network: n, networkPassphrase: np } = JSON.parse(stored);
        if (a) {
          setAddress(a);
          setNetwork(n);
          setNetworkPassphrase(np);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    async function checkFreighter() {
      try {
        const result = await isConnected();
        setIsFreighterInstalled(result.isConnected);

        if (result.isConnected) {
          const addrResult = await getAddress();
          if (addrResult.address) {
            setAddress(addrResult.address);
            const networkResult = await getNetworkDetails();
            setNetwork(networkResult.network);
            setNetworkPassphrase(networkResult.networkPassphrase);
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                address: addrResult.address,
                network: networkResult.network,
                networkPassphrase: networkResult.networkPassphrase,
              })
            );
          }
        }
      } catch {
        setIsFreighterInstalled(false);
      }
    }

    checkFreighter();
  }, []);

  const connect = useCallback(async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    setError(null);

    try {
      const accessResult = await Promise.race([
        requestAccess(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Connection timed out — please try again")), CONNECT_TIMEOUT_MS)
        ),
      ]);

      if (accessResult.address) {
        setAddress(accessResult.address);
        const networkResult = await getNetworkDetails();
        setNetwork(networkResult.network);
        setNetworkPassphrase(networkResult.networkPassphrase);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            address: accessResult.address,
            network: networkResult.network,
            networkPassphrase: networkResult.networkPassphrase,
          })
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setNetwork(null);
    setNetworkPassphrase(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    address,
    network,
    networkPassphrase,
    isFreighterInstalled,
    isConnecting,
    error,
    connect,
    disconnect,
    clearError,
  };
}
