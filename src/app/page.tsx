"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Button
        onClick={startQuiz}
        className="px-6 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700"
      >
        Start Quiz
      </Button>
    </div>
  );
}
