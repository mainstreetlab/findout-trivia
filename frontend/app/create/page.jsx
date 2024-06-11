import SliderDemo from "@/components/CustomSlider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CgMathPlus } from "react-icons/cg";

import quizData from "@/data/quizData";

const QuestionCard = ({ question, number }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-6 my-6">
      <div className="w-full px-2 flex flex-col gap-2">
        <Label htmlFor="q-1" className="text-lg font-medium">
          Question {number}
        </Label>
        <Textarea placeholder="Type your question here..." id="q-1" />
      </div>
      {/* <p className="text-sm text-muted-foreground">
        Enter your question here...
      </p> */}
      <div className="w-full flex flex-col items-center justify-center gap-4 px-2">
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="A." />
        </div>
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="B." />
        </div>
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="C." />
        </div>
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="D." />
        </div>
      </div>
    </div>
  );
};

const CreatePage = () => {
  return (
    <main className="h-screen mt-4">
      <div className="container mx-auto h-full bg-white md:max-w-md pt-2">
        <div className="flex flex-col items-center justify-center px-2 gap-2">
          <h2 className="mb-6 text-2xl font-bold">Set Your Prize</h2>
          <SliderDemo defaultValue={[0]} step={1} min={0} max={5} />
          <div class="flex items-center mt-8 text-sm w-[75%]">
            <hr className="flex-grow border-t border-accent/30" />
            <span className="px-4 text-accent-hover">OR</span>
            <hr className="flex-grow border-t border-accent/30" />
          </div>
          <div className="w-full my-2">
            <Input type="number" placeholder="Enter prize amount..." />
          </div>
        </div>

        {quizData.map((question, idx) => {
          return (
            <QuestionCard key={idx} question={question} number={idx + 1} />
          );
        })}

        {/* Add another question */}
        {quizData < 5 && (
          <div className="flex items-center justify-center">
            <Button variant="outline" size="lg">
              <CgMathPlus className="w-8 h-8" />
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CreatePage;
