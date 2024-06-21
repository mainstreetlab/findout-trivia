import QuestionList from "@/components/QuestionList";
import PrizeInput from "@/components/PrizeInput";
import {PrivyProvider} from "@/app/api/(auth)/users/account-module/providers.tsx";

const CreatePage = () => {
  //have a user authentication function here to sign users up/in - link to privy
  //if user is signed in, should call a tx through viem
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
