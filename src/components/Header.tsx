import { signIn, signOut, useSession } from "next-auth/react";

import PrimaryLink from "./PrimaryLink";
import Button from "./Button";
import useBuyCredits from "~/hooks/useBuyCredits";

export default function Header() {
  const session = useSession();

  const isLoggedIn = !!session?.data;

  const { buyCredits } = useBuyCredits();

  const handleSignOut = () => {
    signOut().catch(console.error);
  };

  const handleSignIn = () => {
    signIn().catch(console.error);
  };

  const handleBuyCredits = () => {
    buyCredits().catch(console.error);
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
        <div className="flex items-center gap-6">
          <Button variant="standard" onClick={() => void handleBuyCredits()}>
            Buy Credits
          </Button>
          <Button variant="outlined" onClick={() => void handleSignOut()}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Button onClick={() => void handleSignIn()}>Sign In</Button>
      )}
    </header>
  );
}
