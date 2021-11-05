import { PersistentVector, Context } from "near-sdk-as";
import * as contractController from "./controller/contract.controller";
import { AccountAuthen, AccountProfile } from "./models/AccountProfile.model";
import { Contract } from "./models/Contract.model";
import { ContractInfomation } from "./models/ContractInfomation.model";

export function createContract(
  contractInfomation: ContractInfomation,
  receiver: String
): u64 {
  return contractController.createContract(contractInfomation, receiver);
}

export function updateAccount(id: String, account: AccountAuthen): u64 {
  return contractController.updateAccount(Context.sender, id, account);
}

export function updateStatus(status: u64, id: String): u64 {
  return contractController.updateStatus(Context.sender, status, id);
}

export function getContracts(): PersistentVector<Contract> {
  return contractController.getContracts(Context.sender);
}

export function getContract(id: String): Contract | null {
  return contractController.getContract(Context.sender, id);
}

export function getContractsLength(): u64 {
  return contractController.getContracts(Context.sender).length;
}

export function deleteContract(): u64 {
  return contractController.deleteContract();
}
