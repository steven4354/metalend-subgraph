import { BigInt, log } from "@graphprotocol/graph-ts";
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
  Transfer,
} from "../generated/cERC20/cERC20";
import { Account, ExampleEntity, Market } from "../generated/schema";
import {
  createAccount,
  cTokenDecimals,
  cTokenDecimalsBD,
  exponentToBigDecimal,
  updateCommonCTokenStats,
  zeroBD,
} from "./helpers";
import { createMarket, updateMarket } from "./markets";

export function handleNewImplementation(event: NewImplementation): void {}

export function handleAccrueInterest(event: AccrueInterest): void {
  updateMarket(
    event.address,
    event.block.number.toI32(),
    event.block.timestamp.toI32()
  );
}

export function handleApproval(event: Approval): void {}

export function handleBorrow(event: Borrow): void {
  let market = Market.load(event.address.toHexString())

  if (market == null) {
    market = createMarket(event.address.toHexString())
  }
  
  let accountID = event.params.borrower.toHex()

  // Update cTokenStats common for all events, and return the stats to update unique
  // values for each event
  let cTokenStats = updateCommonCTokenStats(
    market.id,
    market.symbol,
    accountID,
    event.transaction.hash,
    event.block.timestamp.toI32(),
    event.block.number.toI32(),
  )

  let borrowAmountBD = event.params.borrowAmount
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
  let previousBorrow = cTokenStats.storedBorrowBalance

  cTokenStats.storedBorrowBalance = event.params.accountBorrows
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals)

  cTokenStats.accountBorrowIndex = market.borrowIndex
  cTokenStats.totalUnderlyingBorrowed = cTokenStats.totalUnderlyingBorrowed.plus(
    borrowAmountBD,
  )
  cTokenStats.save()

  let account = Account.load(accountID)
  if (account == null) {
    account = createAccount(accountID)
  }
  account.hasBorrowed = true
  account.save()

  if (
    previousBorrow.equals(zeroBD) &&
    !event.params.accountBorrows.toBigDecimal().equals(zeroBD) // checking edge case for borrwing 0
  ) {
    market.numberOfBorrowers = market.numberOfBorrowers + 1
    market.save()
  }
}

export function handleFailure(event: Failure): void {}

export function handleLiquidateBorrow(event: LiquidateBorrow): void {
  let liquidatorID = event.params.liquidator.toHex();
  let liquidator = Account.load(liquidatorID);
  if (liquidator == null) {
    liquidator = createAccount(liquidatorID);
  }
  liquidator.countLiquidator = liquidator.countLiquidator + 1;
  liquidator.save();

  let borrowerID = event.params.borrower.toHex();
  let borrower = Account.load(borrowerID);
  if (borrower == null) {
    borrower = createAccount(borrowerID);
  }
  borrower.countLiquidated = borrower.countLiquidated + 1;
  borrower.save();
}

export function handleLiquidateBorrow1(event: LiquidateBorrow1): void {}

export function handleMint(event: Mint): void {}

export function handleNewAdmin(event: NewAdmin): void {}

export function handleNewComptroller(event: NewComptroller): void {}

export function handleNewMarketInterestRateModel(
  event: NewMarketInterestRateModel
): void {
  let marketID = event.address.toHex();
  log.info("marketID: {}", [marketID]);

  let market = Market.load(marketID);
  if (market == null) {
    market = createMarket(marketID);
  }

  market.interestRateModelAddress = event.params.newInterestRateModel;
  market.save();
}

export function handleNewPendingAdmin(event: NewPendingAdmin): void {}

export function handleNewReserveFactor(event: NewReserveFactor): void {}

export function handleRedeem(event: Redeem): void {}

export function handleRepayBorrow(event: RepayBorrow): void {}

export function handleReservesAdded(event: ReservesAdded): void {}

export function handleReservesReduced(event: ReservesReduced): void {}

export function handleTransfer(event: Transfer): void {
  // We only updateMarket() if accrual block number is not up to date. This will only happen
  // with normal transfers, since mint, redeem, and seize transfers will already run updateMarket()
  let marketID = event.address.toHexString();
  let market = Market.load(marketID);

  // TODO: double check queries still ok with this conditional
  if (market == null) {
    market = createMarket(marketID);
  }

  if (market.accrualBlockNumber != event.block.number.toI32()) {
    market = updateMarket(
      event.address,
      event.block.number.toI32(),
      event.block.timestamp.toI32()
    );
  }

  let amountUnderlying = market.exchangeRate.times(
    event.params.amount.toBigDecimal().div(cTokenDecimalsBD)
  );
  let amountUnderylingTruncated = amountUnderlying.truncate(
    market.underlyingDecimals
  );

  let accountFromID = event.params.from.toHex();

  // Checking if the tx is FROM the cToken contract (i.e. this will not run when minting)
  // If so, it is a mint, and we don't need to run these calculations
  if (accountFromID != marketID) {
    let accountFrom = Account.load(accountFromID);
    if (accountFrom == null) {
      createAccount(accountFromID);
    }

    // Update cTokenStats common for all events, and return the stats to update unique
    // values for each event
    let cTokenStatsFrom = updateCommonCTokenStats(
      market.id,
      market.symbol,
      accountFromID,
      event.transaction.hash,
      event.block.timestamp.toI32(),
      event.block.number.toI32()
    );

    cTokenStatsFrom.cTokenBalance = cTokenStatsFrom.cTokenBalance.minus(
      event.params.amount
        .toBigDecimal()
        .div(cTokenDecimalsBD)
        .truncate(cTokenDecimals)
    );

    cTokenStatsFrom.totalUnderlyingRedeemed = cTokenStatsFrom.totalUnderlyingRedeemed.plus(
      amountUnderylingTruncated
    );
    cTokenStatsFrom.save();

    if (cTokenStatsFrom.cTokenBalance.equals(zeroBD)) {
      market.numberOfSuppliers = market.numberOfSuppliers - 1;
      market.save();
    }
  }

  let accountToID = event.params.to.toHex();
  // Checking if the tx is TO the cToken contract (i.e. this will not run when redeeming)
  // If so, we ignore it. this leaves an edge case, where someone who accidentally sends
  // cTokens to a cToken contract, where it will not get recorded. Right now it would
  // be messy to include, so we are leaving it out for now TODO fix this in future
  if (accountToID != marketID) {
    let accountTo = Account.load(accountToID);
    if (accountTo == null) {
      createAccount(accountToID);
    }

    // Update cTokenStats common for all events, and return the stats to update unique
    // values for each event
    let cTokenStatsTo = updateCommonCTokenStats(
      market.id,
      market.symbol,
      accountToID,
      event.transaction.hash,
      event.block.timestamp.toI32(),
      event.block.number.toI32()
    );

    let previousCTokenBalanceTo = cTokenStatsTo.cTokenBalance;
    cTokenStatsTo.cTokenBalance = cTokenStatsTo.cTokenBalance.plus(
      event.params.amount
        .toBigDecimal()
        .div(cTokenDecimalsBD)
        .truncate(cTokenDecimals)
    );

    cTokenStatsTo.totalUnderlyingSupplied = cTokenStatsTo.totalUnderlyingSupplied.plus(
      amountUnderylingTruncated
    );
    cTokenStatsTo.save();

    if (
      previousCTokenBalanceTo.equals(zeroBD) &&
      !event.params.amount.toBigDecimal().equals(zeroBD) // checking edge case for transfers of 0
    ) {
      market.numberOfSuppliers = market.numberOfSuppliers + 1;
      market.save();
    }
  }
}
