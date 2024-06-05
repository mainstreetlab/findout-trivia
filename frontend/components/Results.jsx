import { useSearchParams } from "next/navigation";

const Results = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <div>{id}</div>;
};

export default Results;
