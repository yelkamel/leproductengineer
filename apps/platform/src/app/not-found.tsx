import { Case, Recit } from "@lpe/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bd-sky flex flex-1 items-center justify-center p-8">
      <Case className="flex max-w-md flex-col items-start gap-4 p-6">
        <Recit>Page introuvable</Recit>
        <h1 className="bd-h2">Cette case n&apos;existe pas.</h1>
        <Link href="/" className="bd-link">
          Retour au dojo
        </Link>
      </Case>
    </main>
  );
}
