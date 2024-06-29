"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "User not found",
    };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
    });

    let income = 0;
    let expense = 0;

    transactions.map((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
      return transaction;
    });

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return {
      error: "Database error",
    };
  }
}

export default getIncomeExpense;
