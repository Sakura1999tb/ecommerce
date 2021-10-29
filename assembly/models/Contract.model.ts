import {
  u128,
  PersistentVector,
  Context,
  ContractPromiseBatch,
} from "near-sdk-as";
import { AccountAuthen, AccountProfile } from "./AccountProfile.model";
import { ContractInfomation } from "./ContractInfomation.model";
import { compareProfile, get_profile } from "../utils";

function makeid(length: i32): String {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i <  length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength) as i32);
  }
  return result;
}

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
    this.id = makeid(10);
    this.status = 0;
    this.statusSender = 0;
    this.statusReceiver = 0;
    this.contractInfomation = contractInfomation
  }

  updateStatus(user: String, status: u64): void {
    if (user == this.sender) {
      this.statusSender = status;
    }

    if (user == this.receiver) {
      // tranf
      this.statusReceiver = status;
    }
  }

  action(): void {
    if (this.statusSender && this.statusReceiver) {
      ContractPromiseBatch.create(this.sender as string).transfer(
        u128.from(this.contractInfomation.price)
      );
    }
  }

  updateAccount(account: AccountAuthen, user: String): u64 {
    if (user == this.sender) {
      const check = this.checkAccount(account);
      if (check) {
        this.contractInfomation.updateAccount(account);
        return  1;
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
