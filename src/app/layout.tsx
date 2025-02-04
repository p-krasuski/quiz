"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQuizPage = pathname.startsWith("/quiz");

  return (
    <html lang="en">
      <body className="text-gray-900 bg-gray-100">
        <nav className="p-4 text-white bg-blue-600">
          <div className="container flex items-center justify-between mx-auto">
            <Link href="/" className="text-lg font-bold">
              Psychologia Emocji i Motywacji
            </Link>
            {isQuizPage ? (
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300"
              >
                Restart Quiz
              </button>
            ) : (
              <Link href="/quiz">
                <Button className="text-black bg-gray-200 hover:bg-gray-300">
                  Start Quiz
                </Button>
              </Link>
            )}
          </div>
        </nav>

        <main className="container p-6 mx-auto">{children}</main>
      </body>
    </html>
  );
}
