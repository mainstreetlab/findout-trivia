import QuestionList from "@/components/QuestionList";


//TO DO
//We import two more newly created button components: SignIn.tsx & Submit.tsx
//SignIn component will link -> privy user authentication and ```useLogin``` privy hook prompt
//Submit component will link -> smart contract transaction call prompt, uses viem/chains to connect - the privy's default and supported chains config in the PrivyProvider component already linked to the project's root or - a custom rpc provider 

const CreatePage = () => {
  //include a function that switches between the SignIn and Submit component when some conditions are met/not met.
  //submit component should receive parameters of prizeInput and QuestionLink. 
  return (
    <main className="h-screen pt-28">
      <div className="container mx-auto h-full bg-white md:max-w-md">
        <QuestionList />
      </div>
    </main>
  );
};

export default CreatePage;
