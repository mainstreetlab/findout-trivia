import { Progress } from '@/components/ui/progress';
import { FaCircleCheck } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  complete: boolean;
}

const ProgressBar = ({ progress, complete }: ProgressBarProps) => {
  return (
    <div className="w-[90%] flex justify-between items-center gap-2">
      <div
        className={cn('flex items-center flex-1 p-2 -ml-2', {
          '-mr-2': progress > 60 && !complete,
        })}
      >
        <Progress value={progress} />
      </div>
      <FaCircleCheck
        className={`${complete ? 'block' : 'hidden'} text-xl text-indigo-500`}
      />
    </div>
  );
};

export default ProgressBar;
