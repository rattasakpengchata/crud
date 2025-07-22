import { NextResponse } from "next/server";
import { getCustomers } from "../../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";
  const customers = await getCustomers(keyword);
  return NextResponse.json(customers);
}