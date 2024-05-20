# Solidity template

This is a template for GitHub repos with Solidity smart contracts using Forge and Hardhat. This template was made by the Mainstreet Labs team and adopted from the LooksRare team for Solidity-based repos. Feel free to use or get inspired to build your own templates!

## Getting Started

Set an dotenv file with:

```
FOUNDRY_INVARIANT_FAIL_ON_REVERT=true
```

then

```
pnpm install --ignore-scripts
forge install foundry-rs/forge-std
forge install dapphub/ds-test
forge install gelatodigital/vrf-contracts
FOUNDRY_PROFILE=local forge test
```

## About this repo

### Structure

It is a hybrid [Hardhat-Viem](https://hardhat.org/) repo that also requires [Foundry](https://book.getfoundry.sh/index.html) to run Solidity tests powered by the [ds-test library](https://github.com/dapphub/ds-test/).

> To install Foundry, please follow the instructions [here](https://book.getfoundry.sh/getting-started/installation.html).

### Run tests

- TypeScript tests are included in the `typescript` folder in the `test` folder at the root of the repo.
- Solidity tests are included in the `foundry` folder in the `test` folder at the root of the repo.

### Example of Foundry/Forge commands

```shell
forge build
forge test
forge test -vv
forge tree
```

### Example of Hardhat commands

```shell
pnpx hardhat accounts
pnpx hardhat compile
pnpx hardhat clean
pnpx hardhat test
pnpx hardhat node
pnpx hardhat help
REPORT_GAS=true pnpx hardhat test
pnpx hardhat coverage
pnpx hardhat run scripts/deploy.ts
TS_NODE_FILES=true pnpx ts-node scripts/deploy.ts
pnpx eslint '**/*.{js,ts}'
pnpx eslint '**/*.{js,ts}' --fix
pnpx prettier '**/*.{json,sol,md}' --check
pnpx prettier '**/*.{json,sol,md}' --write
pnpx solhint 'contracts/**/*.sol'
pnpx solhint 'contracts/**/*.sol' --fix
```
