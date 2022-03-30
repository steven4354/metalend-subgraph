import { Address, log } from "@graphprotocol/graph-ts";
import { cERC20 } from "../generated/cERC20/cERC20";
import { Market } from "../generated/schema";

export function createMarket(marketAddress: string): Market {
    log.info('createMarket: {}', [marketAddress])

    let market: Market
    // let contract = cERC20.bind(Address.fromString(marketAddress))
  
    log.info('new Market ', [])
    market = new Market(marketAddress)

    // TODO: update this with the correct values
    log.info('market.underlyingAddress ', [])
    market.underlyingAddress = Address.fromString(
        '0x0000000000000000000000000000000000000000',
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