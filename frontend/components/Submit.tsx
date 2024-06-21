//Submit component will be embedded in @app/create/page.jsx. It should import chains from viem, custom RPC components from privy's react-auth, the returned QuestionList and PrizeInput components from @app/create/page.jsx and trigger a smart contract transaction call prompt on a specific chain per call when some conditions are met, uses privy's default and supported chains config or custom rpc provider to execute the call.

/*
 * import {PrivyProvider} from "@/app/api/(auth)/users/account-module/providers.tsx";
 * import {useQuizStore, QuestionCard, QuestionList, PrizeInput} from @/app/create/page.jsx";
 * import useQuizStore from "@/hooks/useQuizStore";
 * 
 * const Choices = QuestionList.choices
 * 
 * const Choices = QuestionCard(questionIdx).questions[]
 * return {
      questions: state.questions,
      editQuestion: state.editQuestion,
      editChoice: state.editChoice,
    };
 */