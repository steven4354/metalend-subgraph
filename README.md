# Metalend subgraph

Indexing [Metalend](https://metalend.tech/), the Axie lending protocol, using Graph Protocol

[Deployed subgraph](https://thegraph.com/hosted-service/subgraph/steven4354/metalend?selected=playground)

### Running locally

If you'd like to see your changes before deploying to the above subgraph, you can clone and run the local [graph-node repo](https://github.com/graphprotocol/graph-node)

In #Helpful notes you can see some commands to run the local graph node. Additionally, the README.md within the [graph-node repo](https://github.com/graphprotocol/graph-node) shows how to set it up to run the code here.

After running locally, you should see logs on the graph-node instance. To log items there, below is an example

```
import { log } from '@graphprotocol/graph-ts/index'
log.info('STEVENDEBUG updateMarket starting', [])  
```

If you have any other questions, free to check with Steven on running these code changes and contributing to the repo

### Deployment

To deployment you can run the below commands to deploy your changes to the [deployed subgraph](https://thegraph.com/hosted-service/subgraph/steven4354/metalend?selected=playground)

```
cd metalend
graph auth
```

post the access key to the subgraph (check with Steven)

```
yarn codegen
yarn build
yarn deploy
```

### Helpful notes & commands

Local client for the graph
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

### Common graphql queries

```
{
  accounts(first: 10) {
    id
    tokens(first: 5) {
      id
      symbol
    }
  }
}
```

```
{
  markets(first: 7) {
    borrowRate
    cash
    collateralFactor
    exchangeRate
    interestRateModelAddress
    name
    reserves
    supplyRate
    symbol
    id
    totalBorrows
    totalSupply
    underlyingAddress
    underlyingName
    underlyingPrice
    underlyingSymbol
    reserveFactor
    underlyingPriceUSD
  }
}
```

```
{
  accountCTokens(first:100) {
    id
    symbol
    cTokenBalance
    accountBorrowIndex
    totalUnderlyingSupplied
    totalUnderlyingRedeemed
    totalUnderlyingBorrowed
    totalUnderlyingRepaid
    storedBorrowBalance
  }
}
```