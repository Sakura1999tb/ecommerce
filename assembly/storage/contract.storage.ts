import { Contract } from "../models/Contract.model";
import { PersistentVector } from "near-sdk-as";

class Storage {
  public store: PersistentVector<Contract>;

  constructor() {
    this.store = new PersistentVector<Contract>("");
  }

  get(user: String): PersistentVector<Contract> {
    let result = new PersistentVector<Contract>(""); // choose a unique prefix per collection
    for (let i = 0; i < this.store.length; i++) {
      const contract: Contract = this.store[i];
      if (contract.sender == user || contract.receiver == user) {
        result.push(contract);
      }
    }
    return result;
  }

  update(contract: Contract): void {
    for (let i = 0; i < this.store.length; i++) {
      const _contract: Contract = this.store[i];
      if (contract.id == _contract.id) {
        this.store.replace(i, contract);
      }
    }
  }

  push(contract: Contract): void {
    this.store.push(contract);
  }

  getContract(user: String, id: String): Contract | null {
    for (let i = 0; i < this.store.length; i++) {
      const contract: Contract = this.store[i];
      if (
        contract.id == id &&
        (contract.sender == user || contract.receiver == user)
      ) {
        return contract;
      }
    }
    return null;
  }
}

export const storage = new Storage();
