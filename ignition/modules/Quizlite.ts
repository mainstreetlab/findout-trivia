import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Quizlite", (m) => {
    const quiz = m.contract("Quizlite");

    return { quizlite };
});