import { addUser } from "@/actions/user-actions";
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

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: username!,
        firstName: first_name,
        lastName: last_name,
        photo: image_url,
      };

      await addUser(user);
      return NextResponse.json({ message: "New user created", user });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
