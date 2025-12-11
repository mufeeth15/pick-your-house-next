import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";
import bcrypt from "bcrypt";

export async function POST(req) {

  try {
    const { username, password } = await req.json();

    console.log("API RECEIVED:")
    console.log("received username:", username);
    // const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    // This treats "sha256" as the name of the algorithm
    // const hashedPassword = bcrypt.hashSync(password, 12);

    const { data: user, error } = await supabaseServer
      .from("admin_login")
      .select("password")
      .eq("username", username)
      .single();

    console.log("Supabase return user:", user);
    console.log("Supabase error:", error);

    if (error || !user) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log("Password wrong for:", username);
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    console.log("LOGIN SUCCESS:", username);
    return NextResponse.json({
      success: true,
      message: "Login successful",
    });

  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}