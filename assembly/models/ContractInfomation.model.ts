import { AccountProfile, AccountAuthen } from "./AccountProfile.model";

@nearBindgen
export class ContractInfomation {
  public price: u64;
  public accountProfile: AccountProfile;
  public account: AccountAuthen;

  constructor(
    price: u64,
    accountProfile: AccountProfile,
    account: AccountAuthen
  ) {
    this.price = price;
    this.accountProfile = accountProfile;
    this.account = account;
  }

  updateAccount(account: AccountAuthen): void {
    this.account = account;
  }
}
