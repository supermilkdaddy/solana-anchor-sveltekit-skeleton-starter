export type SolanaAnchorSveltekitSkeletonStarter = {
  "version": "0.1.0",
  "name": "solana_anchor_sveltekit_skeleton_starter",
  "instructions": [
    {
      "name": "createLedger",
      "accounts": [
        {
          "name": "ledgerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "color",
          "type": "string"
        }
      ]
    },
    {
      "name": "modifyLedger",
      "accounts": [
        {
          "name": "ledgerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newBalance",
          "type": "u32"
        }
      ]
    },
    {
      "name": "modifyLedgerWithInstructionData",
      "accounts": [
        {
          "name": "ledgerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "data",
          "type": {
            "defined": "LedgerInstructions"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ledger",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "color",
            "type": "string"
          },
          {
            "name": "balance",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "LedgerInstructions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "operation",
            "type": "u32"
          },
          {
            "name": "operationValue",
            "type": "u32"
          }
        ]
      }
    }
  ]
};

export const IDL: SolanaAnchorSveltekitSkeletonStarter = {
  "version": "0.1.0",
  "name": "solana_anchor_sveltekit_skeleton_starter",
  "instructions": [
    {
      "name": "createLedger",
      "accounts": [
        {
          "name": "ledgerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "color",
          "type": "string"
        }
      ]
    },
    {
      "name": "modifyLedger",
      "accounts": [
        {
          "name": "ledgerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newBalance",
          "type": "u32"
        }
      ]
    },
    {
      "name": "modifyLedgerWithInstructionData",
      "accounts": [
        {
          "name": "ledgerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "data",
          "type": {
            "defined": "LedgerInstructions"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ledger",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "color",
            "type": "string"
          },
          {
            "name": "balance",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "LedgerInstructions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "operation",
            "type": "u32"
          },
          {
            "name": "operationValue",
            "type": "u32"
          }
        ]
      }
    }
  ]
};
