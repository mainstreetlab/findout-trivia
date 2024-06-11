import Link from "next/link";

const Results = ({ id }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-md w-[420px] h-[95%] text-primary gap-8 overflow-y-auto pb-6">
      <div className="w-full flex justify-between items-center p-4 gap-2">
        {id}
        <Link href="/">Back to Quiz</Link>
      </div>
    </div>
  );
};

export default Results;
