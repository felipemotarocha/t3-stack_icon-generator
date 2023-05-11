import { signIn, signOut, useSession } from "next-auth/react";

import PrimaryLink from "./PrimaryLink";
import Button from "./Button";

export default function Header() {
  const session = useSession();

  const isLoggedIn = !!session?.data;

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-800">
      <PrimaryLink href="/" className="hover:text-cyan-500">
        Icon Generator
      </PrimaryLink>
      <ul>
        <li>
          <PrimaryLink href="/generate">Generate</PrimaryLink>
        </li>
      </ul>

      {isLoggedIn ? (
        <Button onClick={() => void handleSignOut()}>Sign Out</Button>
      ) : (
        <Button onClick={() => void handleSignIn()}>Sign In</Button>
      )}
    </header>
  );
}
