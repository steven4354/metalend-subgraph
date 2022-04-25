import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  Failure,
  NewAdmin,
  NewImplementation,
  NewPendingAdmin,
  NewPendingImplementation,
  ActionPaused,
  ActionPaused1,
  MarketListed,
  NewBorrowCap,
  NewBorrowCapGuardian,
  NewCloseFactor,
  NewCollateralFactor,
  NewLiquidationDiscount,
  NewLiquidationIncentive,
  NewPauseGuardian,
  NewPriceOracle
} from "../generated/Comptroller/Comptroller"
import { ExampleEntity, Comptroller, Market } from "../generated/schema"
import { mantissaFactorBD } from "./helpers"

export function handleFailure(event: Failure): void {}

export function handleNewAdmin(event: NewAdmin): void {}

export function handleNewImplementation(event: NewImplementation): void {}

export function handleNewPendingAdmin(event: NewPendingAdmin): void {}

export function handleNewPendingImplementation(
  event: NewPendingImplementation
): void {}

export function handleActionPaused(event: ActionPaused): void {}

export function handleActionPaused1(event: ActionPaused1): void {}

export function handleMarketListed(event: MarketListed): void {}

export function handleNewBorrowCap(event: NewBorrowCap): void {}

export function handleNewBorrowCapGuardian(event: NewBorrowCapGuardian): void {}

export function handleNewCloseFactor(event: NewCloseFactor): void {
  let comptroller = Comptroller.load('1')
  if (comptroller !== null) {
    comptroller.closeFactor = event.params.newCloseFactorMantissa
    comptroller.save()
  }
}

// market id should be 0xc49e69d88983f466014635df251986770a031f2b
// but i get 0x764f0f637a87bb9109335e0911a790e1a541a4bf for event.params.cToken.toHexString()
export function handleNewCollateralFactor(event: NewCollateralFactor): void {
  // hello
  let market = Market.load(event.params.cToken.toHexString())

  if (market == null) {
    log.info("market not found: {} ", [event.params.cToken.toHexString()])
    return
  }

  market.collateralFactor = event.params.newCollateralFactorMantissa
    .toBigDecimal()
    .div(mantissaFactorBD)

  log.info('STEVENDEBUG handleNewCollateralFactor market.collateralFactor {}', [market.collateralFactor.toString()])  

  market.save()
}

export function handleNewLiquidationDiscount(
  event: NewLiquidationDiscount
): void {}

export function handleNewLiquidationIncentive(event: NewLiquidationIncentive): void {
  let comptroller = Comptroller.load('1')
  if (comptroller !== null) {
    comptroller.liquidationIncentive = event.params.newLiquidationIncentiveMantissa
    comptroller.save()
  }
}

export function handleNewPauseGuardian(event: NewPauseGuardian): void {}

export function handleNewPriceOracle(event: NewPriceOracle): void {
  let comptroller = Comptroller.load('1')
  // This is the first event used in this mapping, so we use it to create the entity
  if (comptroller == null) {
    comptroller = new Comptroller('1')
  }
  comptroller.priceOracle = event.params.newPriceOracle
  comptroller.save()
}