// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewImplementation extends ethereum.Event {
  get params(): NewImplementation__Params {
    return new NewImplementation__Params(this);
  }
}

export class NewImplementation__Params {
  _event: NewImplementation;

  constructor(event: NewImplementation) {
    this._event = event;
  }

  get oldImplementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newImplementation(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class cAXIE extends ethereum.SmartContract {
  static bind(address: Address): cAXIE {
    return new cAXIE("cAXIE", address);
  }

  accountTokens(param0: Address, param1: BigInt): BigInt {
    let result = super.call(
      "accountTokens",
      "accountTokens(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_accountTokens(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "accountTokens",
      "accountTokens(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  admin(): Address {
    let result = super.call("admin", "admin():(address)", []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("admin", "admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  appraisalOracle(): Address {
    let result = super.call(
      "appraisalOracle",
      "appraisalOracle():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_appraisalOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "appraisalOracle",
      "appraisalOracle():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  comptroller(): Address {
    let result = super.call("comptroller", "comptroller():(address)", []);

    return result[0].toAddress();
  }

  try_comptroller(): ethereum.CallResult<Address> {
    let result = super.tryCall("comptroller", "comptroller():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  confirmedTransactions(param0: Address): boolean {
    let result = super.call(
      "confirmedTransactions",
      "confirmedTransactions(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_confirmedTransactions(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "confirmedTransactions",
      "confirmedTransactions(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  implementation(): Address {
    let result = super.call("implementation", "implementation():(address)", []);

    return result[0].toAddress();
  }

  try_implementation(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "implementation",
      "implementation():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenOwners(param0: BigInt): Address {
    let result = super.call("tokenOwners", "tokenOwners(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_tokenOwners(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "tokenOwners",
      "tokenOwners(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get comptroller_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get appraisalOracle_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get name_(): string {
    return this._call.inputValues[2].value.toString();
  }

  get symbol_(): string {
    return this._call.inputValues[3].value.toString();
  }

  get admin_(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get implementation_(): Address {
    return this._call.inputValues[5].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class _setImplementationCall extends ethereum.Call {
  get inputs(): _setImplementationCall__Inputs {
    return new _setImplementationCall__Inputs(this);
  }

  get outputs(): _setImplementationCall__Outputs {
    return new _setImplementationCall__Outputs(this);
  }
}

export class _setImplementationCall__Inputs {
  _call: _setImplementationCall;

  constructor(call: _setImplementationCall) {
    this._call = call;
  }

  get implementation_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class _setImplementationCall__Outputs {
  _call: _setImplementationCall;

  constructor(call: _setImplementationCall) {
    this._call = call;
  }
}
