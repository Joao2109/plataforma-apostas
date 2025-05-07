"use client";
import { useState } from "react";
import { converter } from "@/functions/form-converter";
import { Button } from "@/components/ui/button";
const TestsPage = () => {
  const [sending, setSending] = useState(false);
  return (
    <main className="w-full min-h-[calc(100dvh-160px)] flex items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSending(true);
          try {
            const q = await fetch("/api/transaction", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(converter(e.currentTarget)),
            });
            const res = await q.json();
            setSending(false);
            console.log(res.message);
          } catch (err) {
            console.error("Transaction failed:", err);
            alert("Transaction failed. Please try again.");
          }
        }}
        className="flex flex-col gap-2"
      >
        <input
          className="text-center"
          type="number"
          name="value"
          id="value"
          required
        />
        <input
          className="text-center"
          type="text"
          name="key"
          id="key"
          value="48535303553"
          required
          readOnly
        />
        <Button type="submit" disabled={sending}>
          Submit
        </Button>
      </form>
    </main>
  );
};
export default TestsPage;
