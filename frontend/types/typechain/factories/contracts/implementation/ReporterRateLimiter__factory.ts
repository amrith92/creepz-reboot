/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ReporterRateLimiter,
  ReporterRateLimiterInterface,
} from "../../../contracts/implementation/ReporterRateLimiter";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "aRate",
        type: "uint64",
      },
    ],
    name: "setReporterRateLimit",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ReporterRateLimiter__factory {
  static readonly abi = _abi;
  static createInterface(): ReporterRateLimiterInterface {
    return new utils.Interface(_abi) as ReporterRateLimiterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReporterRateLimiter {
    return new Contract(address, _abi, signerOrProvider) as ReporterRateLimiter;
  }
}
