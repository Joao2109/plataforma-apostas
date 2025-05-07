import { Transaction } from "@/functions/transactions";
export const POST = async (req: Request) => {
  const data = await req.json();
  data.value = Number(data.value);
  try {
    await Transaction.commit("withdraw", data);
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Transaction failed" }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify({ message: "Transaction successful" }), {
    status: 200,
  });
};
