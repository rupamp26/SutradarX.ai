"use server";

import { aptos } from "@/lib/aptos";

export async function fundAccountAction(address: string): Promise<{ success: boolean; error?: string }> {
  try {
    await aptos.fundAccount({ accountAddress: address, amount: 100_000_000 }); // Fund 1 APT
    return { success: true };
  } catch (error: any) {
    console.error("Faucet error:", error);
    return { success: false, error: error.message || "Failed to fund account." };
  }
}

export async function getAccountBalanceAction(address: string): Promise<number> {
  try {
    const resource = await aptos.getAccountResource({
      accountAddress: address,
      resourceType: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
    });
    return Number((resource as { coin: { value: string } }).coin.value) / 10 ** 8;
  } catch (error: any) {
    if ((error as any).status === 404) {
      return 0;
    }
    console.error("Get balance error:", error);
    throw error;
  }
}
