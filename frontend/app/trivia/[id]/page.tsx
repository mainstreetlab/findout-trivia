import Quiz from '@/components/Quiz';
import useFetch from '@/hooks/useFetch';

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/trivia/${slug}`);
  return res.json();
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = await getData(id);
  const trivia = JSON.parse(data);
  console.log(trivia);

  return (
    <main className="h-screen pt-28">
      <div className="container mx-auto h-full bg-white md:max-w-md">
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <Quiz trivia={trivia} />
        </div>
      </div>
    </main>
  );
}
