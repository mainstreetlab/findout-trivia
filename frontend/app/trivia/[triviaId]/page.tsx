import Quiz from '@/components/Quiz';

export default function Page({ params }: { params: { triviaId: string } }) {
  return (
    <main className="h-screen pt-24">
      <div className="container mx-auto h-full bg-white md:max-w-md">
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <Quiz triviaId={params.triviaId} />
        </div>
      </div>
    </main>
  );
}
