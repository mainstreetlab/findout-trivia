import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Quiz", (m) => {
    const quiz = m.contract("Quiz");

    return { quiz };
});