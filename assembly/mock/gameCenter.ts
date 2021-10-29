import {
  Account,
  AccountAuthen,
  AccountProfile,
} from "../models/AccountProfile.model";

class gameCenter {
  public data: Array<Account>;

  constructor() {
    this.data = new Array<Account>();
    this.init();
  }

  init(): void {
    const accountProfile1: AccountProfile = new AccountProfile(
      "1",
      "15",
      "123",
      "321"
    );
    const accountAuthen1 = new AccountAuthen("mock1", "mock1");
    const account1 = new Account(accountAuthen1, accountProfile1);
    this.data.push(account1);

    const accountProfile2: AccountProfile = new AccountProfile(
      "2",
      "20",
      "321",
      "123"
    );
    const accountAuthen2 = new AccountAuthen("mock2", "mock2");
    const account2 = new Account(accountAuthen2, accountProfile2);
    this.data.push(account2);

    const accountProfile3: AccountProfile = new AccountProfile(
      "3",
      "24",
      "111",
      "222"
    );
    const accountAuthen3 = new AccountAuthen("mock3", "mock3");
    const account3 = new Account(accountAuthen3, accountProfile3);
    this.data.push(account3);
  }

  getAccount(username: String, password: String): Account | null {
    for (let i = 0; i < this.data.length; i++) {
      const acc: Account = this.data[i];
      if (
        acc.accountAuthen.password == password &&
        acc.accountAuthen.username == username
      ) {
        return acc;
      }
    }
    return null;
  }
}

const game = new gameCenter();

export default game;
