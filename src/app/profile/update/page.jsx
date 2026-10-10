
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      "/signin?reason=auth-required&callbackURL=%2Fprofile%2Fupdate"
    );
  }

  return (
    <ProfileUpdateForm
      currentName={session.user.name || ""}
    />
  );
}
