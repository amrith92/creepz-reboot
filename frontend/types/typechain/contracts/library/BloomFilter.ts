/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface BloomFilterInterface extends utils.Interface {
  functions: {
    "addToBitmap(uint256,uint8,bytes32)": FunctionFragment;
    "falsePositive(uint256,uint8,bytes32)": FunctionFragment;
    "getHashCount(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "addToBitmap" | "falsePositive" | "getHashCount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addToBitmap",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "falsePositive",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getHashCount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addToBitmap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "falsePositive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHashCount",
    data: BytesLike
  ): Result;

  events: {};
}

export interface BloomFilter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BloomFilterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addToBitmap(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _newBitmap: BigNumber }>;

    falsePositive(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { _probablyPresent: boolean }>;

    getHashCount(
      _itemNum: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;
  };

  addToBitmap(
    _bitmap: PromiseOrValue<BigNumberish>,
    _hashCount: PromiseOrValue<BigNumberish>,
    _item: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  falsePositive(
    _bitmap: PromiseOrValue<BigNumberish>,
    _hashCount: PromiseOrValue<BigNumberish>,
    _item: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getHashCount(
    _itemNum: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  callStatic: {
    addToBitmap(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    falsePositive(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getHashCount(
      _itemNum: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;
  };

  filters: {};

  estimateGas: {
    addToBitmap(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    falsePositive(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHashCount(
      _itemNum: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addToBitmap(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    falsePositive(
      _bitmap: PromiseOrValue<BigNumberish>,
      _hashCount: PromiseOrValue<BigNumberish>,
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHashCount(
      _itemNum: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
