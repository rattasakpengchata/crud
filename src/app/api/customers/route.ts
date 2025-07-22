import { NextResponse } from "next/server";
import { getCustomers,getCustomers_simple } from "../../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";
  //const customers = await getCustomers(keyword);
  const customers = await getCustomers_simple();
  return NextResponse.json(customers);
}