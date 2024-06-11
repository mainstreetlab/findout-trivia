"use client";

import Results from "@/components/Results";
import { useSearchParams } from "next/navigation";

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <main className="h-screen">
      <div className="container mx-auto flex flex-col justify-center h-full items-center">
        <Results id={id} />
      </div>
    </main>
  );
};

export default ResultsPage;
