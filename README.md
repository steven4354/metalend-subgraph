subgraph: https://thegraph.com/hosted-service/subgraph/steven4354/metalend?selected=playground

https://github.com/graphprotocol/graph-node

```
graph init \
  --from-contract 0x1bFAA59c95084b5465C22b2Da64c2e236CdbBaaC \
  [--network Matic ] \
  [--abi abis/Comptroller.json] \
  steven4354/metalend
```

```
graph init \
  --from-contract 0x764f0f637a87bB9109335e0911a790e1a541A4bf \
  [--network Matic ] \
  [--abi abis/cAXIE.json] \
  steven4354/metalend
```

```
graph init \
  --from-contract 0xc49e69d88983F466014635DF251986770A031f2b \
  [--network Matic ] \
  [--abi abis/cER20.json] \
  steven4354/metalend
```

```
"Contracts": {
        "CompComptroller": "0x7B16d59332814d8c283cE42F5dAbb05CCEc068a5",
        "AppraisalOracle": "0x1a3942cFBA4c422247408e105C3295E9bD35500C",
        "cWETH": "0xc49e69d88983F466014635DF251986770A031f2b",
        "ComptrollerProd": "0xF3dD2c65E150cC59EeE3800b680d8cA1af9717E9",
        "PriceOracle": "0x9a9Fd343722ca2a9536711257534b8aD04221d35",
        "cWETHDelegate": "0x66d0C4A11FFe80903e92417AAce207D8B1B5D7f1",
        "Unitroller": "0x1bFAA59c95084b5465C22b2Da64c2e236CdbBaaC",
        "Comptroller": "0x1bFAA59c95084b5465C22b2Da64c2e236CdbBaaC",
        "CErc20": "0xc49e69d88983F466014635DF251986770A031f2b",
        "cAXIE": "0x764f0f637a87bB9109335e0911a790e1a541A4bf",
        "CErc721Bridged": "0x764f0f637a87bB9109335e0911a790e1a541A4bf",
        "LiquidityAssessor": "0x8fe44fA10a6f8FAfC45A93BC3797556AfF21A221",
        "cAXIEDelegate": "0xcCD59A6a6514D984321150f31561F80DCb8832Ae",
        "CompUnitroller": "0x7B16d59332814d8c283cE42F5dAbb05CCEc068a5",
        "InterestRateModel": "0xd5f26EE61C5e5fc340ba2cAd260784cfB110618d"
    }
```

example:
```
cargo run -p graph-node --release -- \
  --postgres-url postgresql://steven:steven@localhost:5432/graph-node \
  --ethereum-rpc matic:[CAPABILITIES]:URL \
  --ipfs 127.0.0.1:5001
```

```
cargo run -p graph-node --release -- \
  --postgres-url postgresql://steven:steven@localhost:5432/graph-node \
  --ethereum-rpc matic:https://polygon-mainnet.g.alchemy.com/v2/<key-here> \
  --ipfs 127.0.0.1:5001
```

```
export ETHEREUM_BLOCK_BATCH_SIZE=100
export GRAPH_ETHEREUM_MAX_BLOCK_RANGE_SIZE=1000000
```