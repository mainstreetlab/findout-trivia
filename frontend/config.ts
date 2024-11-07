// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://findout-trivia.vercel.app';
// Add your API KEY from the Coinbase Developer Portal
export const NEXT_PUBLIC_ONCHAINKIT_CDP_KEY = process.env.NEXT_PUBLIC_ONCHAINKIT_CDP_KEY;
export const NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME;
export const NEXT_PUBLIC_PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
export const NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG = process.env.NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG
