import { PersistentVector } from "near-sdk-as";
import * as contractController from "./controller/contract.controller";
import { AccountAuthen } from "./models/AccountProfile.model";
import { Contract } from "./models/Contract.model";
import { ContractInfomation } from "./models/ContractInfomation.model";

export function createContract(
  contractInfomation: ContractInfomation,
  receiver: String
): u64 {
  return contractController.createContract(contractInfomation, receiver);
}

export function updateAccount(
  id: String,
  user: String,
  account: AccountAuthen
): u64 {
  return contractController.updateAccount(id, user, account);
}

export function updateStatus(user: String, status: u64, id: String): u64 {
  return contractController.updateStatus(user, status, id);
}

export function getContracts(user: String):PersistentVector<Contract> {
  return contractController.getContracts(user);
}
