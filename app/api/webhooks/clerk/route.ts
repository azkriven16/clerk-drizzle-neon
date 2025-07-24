import { addUser } from "@/actions/user-actions";
import { UserInput } from "@/db/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;

      const userData: UserInput = {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        name:
          username ||
          `${first_name || ""} ${last_name || ""}`.trim() ||
          "Unknown User",
        firstName: first_name || "test",
        lastName: last_name || "user",
        photo: image_url || "",
      };

      await addUser(userData);

      console.log("New user created:", userData);
      return NextResponse.json({
        message: "New user created",
        user: userData,
      });
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }
}
