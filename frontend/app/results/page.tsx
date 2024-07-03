"use client";

import Results from "@/components/Results";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return (
    <Suspense>
      <main className=" pt-28">
        <div className="container mx-auto flex flex-col justify-center h-full items-center">
          <Results id={id} />
        </div>
      </main>
    </Suspense>
  );
};

export default ResultsPage;
