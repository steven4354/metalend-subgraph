import { BigInt } from "@graphprotocol/graph-ts"
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
import { ExampleEntity, Comptroller } from "../generated/schema"

export function handleFailure(event: Failure): void {
  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())

  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())

  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }

  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // // Entity fields can be set based on event parameters
  // entity.error = event.params.error
  // entity.info = event.params.info

  // // Entities can be written to the store with `.save()`
  // entity.save()

  // // Note: If a handler doesn't require existing field values, it is faster
  // // _not_ to load the entity from the store. Instead, create it fresh with
  // // `new Entity(...)`, set the fields that should be updated and save the
  // // entity back to the store. Fields that were not set or unset remain
  // // unchanged, allowing for partial updates to be applied.

  // // It is also possible to access smart contracts from mappings. For
  // // example, the contract that has emitted the event can be connected to
  // // with:
  // //
  // // let contract = Contract.bind(event.address)
  // //
  // // The following functions can then be called on this contract to access
  // // state variables and other data:
  // //
  // // - contract._acceptAdmin(...)
  // // - contract._acceptImplementation(...)
  // // - contract._setPendingAdmin(...)
  // // - contract._setPendingImplementation(...)
  // // - contract.admin(...)
  // // - contract.comptrollerImplementation(...)
  // // - contract.pendingAdmin(...)
  // // - contract.pendingComptrollerImplementation(...)
  // // - contract._setBorrowPaused(...)
  // // - contract._setCloseFactor(...)
  // // - contract._setCollateralFactor(...)
  // // - contract._setLiquidationDiscount(...)
  // // - contract._setLiquidationIncentive(...)
  // // - contract._setMintPaused(...)
  // // - contract._setPauseGuardian(...)
  // // - contract._setPriceOracle(...)
  // // - contract._setSeizePaused(...)
  // // - contract._setTransferPaused(...)
  // // - contract._supportMarket(...)
  // // - contract.allErc721Markets(...)
  // // - contract.allMarkets(...)
  // // - contract.appraisalOracle(...)
  // // - contract.borrowAllowed(...)
  // // - contract.borrowCapGuardian(...)
  // // - contract.borrowCaps(...)
  // // - contract.borrowGuardianPaused(...)
  // // - contract.closeFactorMantissa(...)
  // // - contract.compComptroller(...)
  // // - contract.getAllErc721Markets(...)
  // // - contract.getAllMarkets(...)
  // // - contract.getBlockNumber(...)
  // // - contract.getBorrowGuardianPaused(...)
  // // - contract.getCloseFactorMantissa(...)
  // // - contract.getCollateralFactorMantissa(...)
  // // - contract.getLiquidationDiscountMantissa(...)
  // // - contract.getLiquidationIncentiveMantissa(...)
  // // - contract.getOracle(...)
  // // - contract.isComptroller(...)
  // // - contract.isMarketListed(...)
  // // - contract.liquidateBorrowAllowed(...)
  // // - contract.liquidateBorrowAllowedErc721(...)
  // // - contract.liquidateCalculateSeizeTokens(...)
  // // - contract.liquidationDiscountMantissa(...)
  // // - contract.liquidationIncentiveMantissa(...)
  // // - contract.liquidityAssessor(...)
  // // - contract.markets(...)
  // // - contract.mintAllowed(...)
  // // - contract.mintAllowedErc721(...)
  // // - contract.mintGuardianPaused(...)
  // // - contract.oracle(...)
  // // - contract.pauseGuardian(...)
  // // - contract.redeemAllowed(...)
  // // - contract.redeemAllowedErc721(...)
  // // - contract.repayBorrowAllowed(...)
  // // - contract.seizeAllowed(...)
  // // - contract.seizeAllowedErc721(...)
  // // - contract.seizeGuardianPaused(...)
  // // - contract.transferAllowed(...)
  // // - contract.transferGuardianPaused(...)
}

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

export function handleNewCollateralFactor(event: NewCollateralFactor): void {}

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