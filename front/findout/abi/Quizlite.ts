export const QuizliteABI = [
    {
        type: "constructor",
        inputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "create",
        inputs: [{ name:"answers", type:"uint256[5]", internalType:"uint256[5]" }],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "deprecate",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "play",
        inputs: [{ name: "choices", type: "uint256[5]", internalType: "uint256[5]" }, { name: "id", type: "uint256", internalType: "uint256" }],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "record",
        inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "reinit",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "event",
        name: "Open",
        inputs: [{ name: "creator", type: "address", indexed: true, internalType: "address" }],
        anonymous: false
    },
    {
        type: "event",
        name: "TryAnother",
        inputs: [{ name: "player", type: "address", indexed: true, internalType: "address" }],
        anonymous: false
    },
    {
        type: "event",
        name: "W",
        inputs: [{ name: "player", type: "address", indexed: true, internalType: "address" }],
        anonymous: false
    }
    ] as const;

  export const QuizliteAddress = "0xfD3355Eaa445A30375237c7f0C77264e8E65C148";