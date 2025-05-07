import crypto from "crypto";
import { efi } from "../lib/efi";
import { prisma } from "../lib/prisma";
export class Transaction {
  private static async getOwnerKey(): Promise<string> {
    const owner = await prisma.user.findFirst({ where: { role: "OWNER" } });
    if (!owner) throw new Error("OWNER user not found");
    const key = await prisma.pixKey.findFirst({
      where: {
        userId: owner.id,
      },
    });
    if (!key) throw new Error("Pix key for OWNER not found");
    return key.key;
  }
  private static async withdraw({
    value,
    key,
  }: {
    value: number;
    key: string;
  }) {
    if (value <= 0) throw new Error("Invalid withdrawal amount");
    const idEnvio = crypto.randomUUID().replace(/-/g, "").slice(0, 35);
    const ownerKey = await this.getOwnerKey();
    try {
      await efi.pixConfigWebhook(
        { chave: ownerKey },
        {
          webhookUrl:
            "https://3af7-45-160-49-227.ngrok-free.app/api/webhook/pix",
        }
      );
      await efi.pixSend(
        { idEnvio },
        {
          valor: value.toFixed(2).toString(),
          pagador: {
            chave: ownerKey,
          },
          favorecido: {
            chave: key,
          },
        }
      );
    } catch (err) {
      console.error("Pix transfer failed:", err);
      throw new Error("Pix transfer failed");
    }
  }
  private static async deposit() {}
  public static async commit(
    type: "deposit" | "withdraw",
    {
      value,
      key,
    }: {
      value: number;
      key: string;
    }
  ) {
    if (type === "deposit") await this.deposit();
    if (type === "withdraw") await this.withdraw({ value, key });
  }
}
