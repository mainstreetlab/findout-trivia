import QuestionList from "@/components/QuestionList";
import PrizeInput from "@/components/PrizeInput";

const CreatePage = () => {
  return (
    <main className="h-screen mt-4">
      <div className="container mx-auto h-full bg-white md:max-w-md">
        <PrizeInput />
        <QuestionList />
      </div>
    </main>
  );
};

export default CreatePage;
