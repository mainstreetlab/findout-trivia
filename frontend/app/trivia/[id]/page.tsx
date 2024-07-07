import Quiz from '@/components/Quiz';
import { hostnameConfig } from '@/config';
import useFetch from '@/hooks/useFetch';

const getData = async (slug: string) => {
  const res = await fetch(`${hostnameConfig}/api/trivia/${slug}`);
  const data = await res.json();
  console.log(data);
  return data;
};

const TriviaPage = async ({ params: { id } }: { params: { id: string } }) => {
  const response = await getData(id);
  const { data: trivia } = response;
  // const trivia = JSON.parse(data);

  return (
    <main className="h-screen pt-28">
      <div className="container mx-auto h-full bg-white md:max-w-md">
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <Quiz trivia={trivia} />
        </div>
      </div>
    </main>
  );
};

export default TriviaPage;