import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  cERC20,
  NewImplementation,
  AccrueInterest,
  Approval,
  Borrow,
  Failure,
  LiquidateBorrow,
  LiquidateBorrow1,
  Mint,
  NewAdmin,
  NewComptroller,
  NewMarketInterestRateModel,
  NewPendingAdmin,
  NewReserveFactor,
  Redeem,
  RepayBorrow,
  ReservesAdded,
  ReservesReduced,
  Transfer
} from "../generated/cERC20/cERC20"
import { ExampleEntity, Market } from "../generated/schema"
import { createMarket } from "./markets"

export function handleNewImplementation(event: NewImplementation): void {}

export function handleAccrueInterest(event: AccrueInterest): void {}

export function handleApproval(event: Approval): void {}

export function handleBorrow(event: Borrow): void {}

export function handleFailure(event: Failure): void {}

export function handleLiquidateBorrow(event: LiquidateBorrow): void {}

export function handleLiquidateBorrow1(event: LiquidateBorrow1): void {}

export function handleMint(event: Mint): void {}

export function handleNewAdmin(event: NewAdmin): void {}

export function handleNewComptroller(event: NewComptroller): void {}

export function handleNewMarketInterestRateModel(
  event: NewMarketInterestRateModel
): void {
  let marketID = event.address.toHex()
  log.info("marketID: {}", [marketID])

  let market = Market.load(marketID)
  if (market == null) {
    market = createMarket(marketID);
  }

  market.interestRateModelAddress = event.params.newInterestRateModel
  market.save()
}

export function handleNewPendingAdmin(event: NewPendingAdmin): void {}

export function handleNewReserveFactor(event: NewReserveFactor): void {}

export function handleRedeem(event: Redeem): void {}

export function handleRepayBorrow(event: RepayBorrow): void {}

export function handleReservesAdded(event: ReservesAdded): void {}

export function handleReservesReduced(event: ReservesReduced): void {}

export function handleTransfer(event: Transfer): void {}
