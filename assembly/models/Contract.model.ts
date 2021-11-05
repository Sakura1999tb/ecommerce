import {
  u128,
  PersistentVector,
  Context,
  ContractPromiseBatch,
  logging,
  ContractPromise
} from "near-sdk-as";
import { AccountAuthen, AccountProfile } from "./AccountProfile.model";
import { ContractInfomation } from "./ContractInfomation.model";
import { compareProfile, get_profile } from "../utils";

//this is required if using a local .env file for private key
@nearBindgen
export class Contract {
  public sender: String;
  public receiver: String;
  public ownerId: String;
  public contractInfomation: ContractInfomation;
  public id: String;
  public status: u64;
  public statusSender: u64;
  public statusReceiver: u64;
  constructor(receiver: String, contractInfomation: ContractInfomation) {
    this.ownerId = Context.sender;
    this.receiver = receiver;
    this.sender = Context.sender;
    this.id = Context.blockTimestamp.toString();
    this.status = 0;
    this.statusSender = 0;
    this.statusReceiver = 0;
    this.contractInfomation = contractInfomation;
  }

  updateStatus(user: String, status: u64): void {
    logging.log(`user: ${user}`);
    logging.log(`sender: ${this.sender}`);
    logging.log(`receiver: ${this.receiver}`);


    if (user == this.sender) {
      this.statusSender = status;
    }

    if (user == this.receiver) {
      // tranf
      this.statusReceiver = status;
    }
  }

  action(): void {
    if (this.statusSender && this.statusReceiver && Context.) {
      ContractPromiseBatch.create(this.sender as string).transfer(
        u128.from(this.contractInfomation.price)
      );
    }
  }

  updateAccount(account: AccountAuthen): u64 {
    logging.log(`account username: ${account.username}`);
    logging.log(`account password: ${account.password}`);
    logging.log(`Context.sender: ${Context.sender}`);

    if (Context.sender == this.sender) {
      const check = this.checkAccount(account);
      logging.log(`check: ${check}`);
      if (check) {
        this.contractInfomation.updateAccount(account);
        return 1;
      }
    }
    return 0;
  }

  checkAccount(account: AccountAuthen): u64 {
    let profile: AccountProfile | null = get_profile(account);
    if (profile) {
      if (compareProfile(this.contractInfomation.accountProfile, profile)) {
        return 1;
      }
    }

    return 0;
  }
}
