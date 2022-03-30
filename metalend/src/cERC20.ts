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
import { Account, ExampleEntity, Market } from "../generated/schema"
import { createAccount } from "./helpers"
import { createMarket, updateMarket } from "./markets"

export function handleNewImplementation(event: NewImplementation): void {}

export function handleAccrueInterest(event: AccrueInterest): void {
  updateMarket(event.address, event.block.number.toI32(), event.block.timestamp.toI32())
}

export function handleApproval(event: Approval): void {}

export function handleBorrow(event: Borrow): void {
  let market = Market.load(event.address.toHexString())
  let accountID = event.params.borrower.toHex()

  // TODO: add rest of compound-v2-subgraph logic here
  let account = Account.load(accountID)
  if (account == null) {
    account = createAccount(accountID)
  }
  account.hasBorrowed = true
  account.save()
}

export function handleFailure(event: Failure): void {}

export function handleLiquidateBorrow(event: LiquidateBorrow): void {
  let liquidatorID = event.params.liquidator.toHex()
  let liquidator = Account.load(liquidatorID)
  if (liquidator == null) {
    liquidator = createAccount(liquidatorID)
  }
  liquidator.countLiquidator = liquidator.countLiquidator + 1
  liquidator.save()

  let borrowerID = event.params.borrower.toHex()
  let borrower = Account.load(borrowerID)
  if (borrower == null) {
    borrower = createAccount(borrowerID)
  }
  borrower.countLiquidated = borrower.countLiquidated + 1
  borrower.save()
}

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

export function handleNewPendingAdmin(event: NewPendingAdmin): void {
  
}

export function handleNewReserveFactor(event: NewReserveFactor): void {}

export function handleRedeem(event: Redeem): void {}

export function handleRepayBorrow(event: RepayBorrow): void {}

export function handleReservesAdded(event: ReservesAdded): void {}

export function handleReservesReduced(event: ReservesReduced): void {}

export function handleTransfer(event: Transfer): void {}
