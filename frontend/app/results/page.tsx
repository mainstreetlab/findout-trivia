"use client";

import Results from "@/components/Results";
import { Suspense } from 'react';

const ResultsPage = () => {
  return (
    <main className=" pt-28">
      <div className="container mx-auto flex flex-col justify-center h-full items-center">
        <Suspense>
          <Results />
        </Suspense>
      </div>
    </main>
  );
};

export default ResultsPage;
