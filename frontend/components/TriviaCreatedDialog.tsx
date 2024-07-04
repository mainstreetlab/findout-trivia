'use client';

// Imports here
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { LuCopy as Copy } from 'react-icons/lu';
import { useDialog } from '@/hooks/useDialog';
import CopyToClipboard from './CopyToClipboard';

interface CreatedDialogProps {
  triviaId: string | null;
  // triviaCreated: boolean;
  // setTriviaCreated: () => void;
}

export default function TriviaCreatedDialog({
  triviaId,
  // triviaCreated,
  // setTriviaCreated,
}: CreatedDialogProps) {
  const { isOpen, onClose } = useDialog();

  const triviaUrl = `${window.location.hostname}:${window.location.port}/trivia/${triviaId}`;

  return (
    triviaId && (
      <div className="w-5/6">
        <Dialog open={isOpen} onOpenChange={onClose} modal defaultOpen={isOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to answer your trivia.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  className="text-[16px]"
                  id="link"
                  defaultValue={triviaUrl}
                  readOnly
                />
              </div>
              <CopyToClipboard text={triviaUrl} />
            </div>
            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button type="button" variant="default">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  );
}
