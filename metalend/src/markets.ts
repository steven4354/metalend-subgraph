import { Address, BigDecimal, log } from "@graphprotocol/graph-ts";
import { cERC20 } from "../generated/cERC20/cERC20";
import { Market } from "../generated/schema";
import { cTokenDecimalsBD, exponentToBigDecimal } from "./helpers";

function getUSDCpriceETH(blockNumber: i32): BigDecimal {
    return BigDecimal.fromString("0.0002954");
}

export function createMarket(marketAddress: string): Market {
    log.info('createMarket: {}', [marketAddress])

    let market: Market
    // let contract = cERC20.bind(Address.fromString(marketAddress))
  
    log.info('new Market ', [])
    market = new Market(marketAddress)

    // TODO: update this with the correct values
    // https://polygonscan.com/token/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
    log.info('market.underlyingAddress ', [])
    market.underlyingAddress = Address.fromString(
        '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    )

    log.info('market.underlyingDecimals ', [])
    market.underlyingDecimals = 18
    // market.underlyingPrice = BigDecimal.fromString('1')

    log.info('market.underlyingName ', [])
    market.underlyingName = 'Wrapped Ether'

    log.info('market.underlyingSymbol ', [])
    market.underlyingSymbol = 'WETH'

    return market
}

export function updateMarket(
    marketAddress: Address,
    blockNumber: i32,
    blockTimestamp: i32,
  ): Market {
    let marketID = marketAddress.toHexString()
    let market = Market.load(marketID)
    if (market == null) {
      market = createMarket(marketID)
    }

    // Only updateMarket if it has not been updated this block
    if (market.accrualBlockNumber != blockNumber) {
        log.info('market.accrualBlockNumber != blockNumber: pass', [])

        let contractAddress = Address.fromString(market.id)
        log.info('contractAddress: {}', [market.id])

        let contract = cERC20.bind(contractAddress)
        log.info('contract: {}', [contractAddress.toString()])

        let usdPriceInEth = getUSDCpriceETH(blockNumber)
        log.info('usdPriceInEth: {}', [usdPriceInEth.toString()])

        market.accrualBlockNumber = contract.accrualBlockNumber().toI32()
        log.info('market.accrualBlockNumber: {}', [market.accrualBlockNumber.toString()])

        market.blockTimestamp = blockTimestamp
        log.info('market.blockTimestamp: {}', [market.blockTimestamp.toString()])

        market.totalBorrows = contract
            .totalBorrows()
            .toBigDecimal()
            .div(exponentToBigDecimal(market.underlyingDecimals))
            .truncate(market.underlyingDecimals)

        market.totalSupply = contract
            .totalSupply()
            .toBigDecimal()
            .div(cTokenDecimalsBD)

        market.save()
    }

    
    return market
  }