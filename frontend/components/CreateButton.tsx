"use client"

import { usePrivy } from '@privy-io/react-auth';
import { Button } from './ui/button';

const CreateButton = () => {
  const { authenticated, login, user } = usePrivy();

  return (
    <>
      {authenticated || user ? (
            <Button type="submit" className="w-3/4 md:w-3/5 px-8">
              Create Trivia
            </Button>
          ) : (
            <Button type='button' className="w-3/4 md:w-3/5 px-8" onClick={login}>
              Login
            </Button>
          )}
    </>
  )
}

export default CreateButton