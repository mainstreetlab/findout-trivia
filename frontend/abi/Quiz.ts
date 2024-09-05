export const QuizABI = [
    {
        type: "constructor",
        inputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "configFee",
        inputs: [
            {
                name: "oldAmount",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "newAmount",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "create",
        inputs: [
            {
                name: "answers",
                type: "uint256[5]",
                internalType: "uint256[5]"
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256"
            }
        ],   
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
        inputs: [
            {
                name: "choices",
                type: "uint256[5]",
                internalType: "uint256[5]"
            },
            {
                name: "id",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "pullFunds",
        inputs: [
            {
                name: "to",
                type: "address",
                internalType: "address"
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "record",
        inputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [
            {
                name: "",
                type: "bytes",
                internalType: "bytes"
            }
        ],
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
        inputs: [
            {
                name: "creator",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "prize",
                type: "uint256",
                indexed: true,
                internalType: "uint256"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "RateUpdate",
        inputs: [
            {
                name: "rate",
                type: "uint256",
                indexed: true,
                internalType: "uint256"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "TryAnother",
        inputs: [
            {
                name: "player",
                type: "address",
                indexed: true,
                internalType: "address"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "W",
        inputs: [
            {
                name: "winner",
                type: "address",
                indexed: true,
                internalType: "address"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Withdrawn",
        inputs: [
            {
                name: "maker",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "amount",
                type: "uint256",
                indexed: true,
                internalType: "uint256"
            }
        ],
        anonymous: false
    }
]

    export const QuizAddress = "0x750D07C9F003EC1B44d368d352aA8b15B31C8343";
