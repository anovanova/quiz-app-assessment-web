import { NextResponse } from "next/server";

export async function GET() {
  const backendURL = process.env.BACKEND_URL;
  try {
    const response = await fetch(`${backendURL}/questions`);
    const data = await response.json();
    return NextResponse.json({ response: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}
