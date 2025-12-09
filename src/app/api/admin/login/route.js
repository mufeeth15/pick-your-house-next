import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      path: "/",
    });

    response.cookies.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
