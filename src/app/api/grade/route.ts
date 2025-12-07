import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const backendURL = process.env.BACKEND_URL;
  const body = await req.json();
  const formData = { answers: body };
  try {
    const response = await fetch(`${backendURL}/grade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return NextResponse.json({ response: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}
