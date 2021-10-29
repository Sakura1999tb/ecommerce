import { storage } from "../storage/contract.storage";
import { Context, PersistentVector } from "near-sdk-as";
import { ContractInfomation } from "../models/ContractInfomation.model";
import { Contract } from "../models/Contract.model";
import { AccountAuthen } from "../models/AccountProfile.model";

export function createContract(
  contractInfomation: ContractInfomation,
  receiver: String
): u64 {
  if (contractInfomation.price && contractInfomation.accountProfile) {
    const profile = contractInfomation.accountProfile;
    if (profile.id && profile.level && profile.wallet && profile.power) {
      const contractInf = new ContractInfomation(
        contractInfomation.price,
        contractInfomation.accountProfile,
        contractInfomation.account
      );
      const contract = new Contract(receiver, contractInf);
      storage.push(contract);
      return 1;
    }

    return 0;
  }

  return 0;
}

export function updateAccount(
  id: String,
  user: String,
  account: AccountAuthen
): u64 {
  if (user == Context.sender) {
    let _contract: Contract | null = storage.getContract(user, id);
    if (_contract) {
      return _contract.updateAccount(account, user);
    }
  }
  return 0;
}

export function updateStatus(user: String, status: u64, id: String): u64 {
  let contract: Contract | null = storage.getContract(user, id);
  if (contract) {
    contract.updateStatus(user, status);
    contract.action();
    return 1;
  }
  return 0;
}

export function getContracts(user: String): PersistentVector<Contract> {
  return storage.get(user);
}
