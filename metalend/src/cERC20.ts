import { BigInt } from "@graphprotocol/graph-ts"
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

export function handleNewImplementation(event: NewImplementation): void {}

export function handleAccrueInterest(event: AccrueInterest): void {}

export function handleApproval(event: Approval): void {}

export function handleBorrow(event: Borrow): void {
  let market = Market.load(event.address.toHexString())
  let accountID = event.params.borrower.toHex()

  // // Update cTokenStats common for all events, and return the stats to update unique
  // // values for each event
  // let cTokenStats = updateCommonCTokenStats(
  //   market.id,
  //   market.symbol,
  //   accountID,
  //   event.transaction.hash,
  //   event.block.timestamp.toI32(),
  //   event.block.number.toI32(),
  // )

  // let borrowAmountBD = event.params.borrowAmount
  //   .toBigDecimal()
  //   .div(exponentToBigDecimal(market.underlyingDecimals))
  // let previousBorrow = cTokenStats.storedBorrowBalance

  // cTokenStats.storedBorrowBalance = event.params.accountBorrows
  //   .toBigDecimal()
  //   .div(exponentToBigDecimal(market.underlyingDecimals))
  //   .truncate(market.underlyingDecimals)

  // cTokenStats.accountBorrowIndex = market.borrowIndex
  // cTokenStats.totalUnderlyingBorrowed = cTokenStats.totalUnderlyingBorrowed.plus(
  //   borrowAmountBD,
  // )
  // cTokenStats.save()

  // let account = Account.load(accountID)
  // if (account == null) {
  //   account = createAccount(accountID)
  // }
  // account.hasBorrowed = true
  // account.save()

  // if (
  //   previousBorrow.equals(zeroBD) &&
  //   !event.params.accountBorrows.toBigDecimal().equals(zeroBD) // checking edge case for borrwing 0
  // ) {
  //   market.numberOfBorrowers = market.numberOfBorrowers + 1
  //   market.save()
  // }

  if (market !== null) {
    market.numberOfBorrowers = market.numberOfBorrowers + 1
    market.save()
  }
}

export function handleFailure(event: Failure): void {}

export function handleLiquidateBorrow(event: LiquidateBorrow): void {}

export function handleLiquidateBorrow1(event: LiquidateBorrow1): void {}

export function handleMint(event: Mint): void {}

export function handleNewAdmin(event: NewAdmin): void {}

export function handleNewComptroller(event: NewComptroller): void {}

export function handleNewMarketInterestRateModel(
  event: NewMarketInterestRateModel
): void {}

export function handleNewPendingAdmin(event: NewPendingAdmin): void {}

export function handleNewReserveFactor(event: NewReserveFactor): void {}

export function handleRedeem(event: Redeem): void {}

export function handleRepayBorrow(event: RepayBorrow): void {}

export function handleReservesAdded(event: ReservesAdded): void {}

export function handleReservesReduced(event: ReservesReduced): void {}

export function handleTransfer(event: Transfer): void {}
