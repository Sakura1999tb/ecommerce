@nearBindgen
export class AccountProfile {
  public id: String;
  public level: String;
  public wallet: String;
  public power: String;

  constructor(id: String, level: String, wallet: String, power: String) {
    this.id = id;
    this.level = level;
    this.wallet = wallet;
    this.power = power;
  }
}

@nearBindgen
export class AccountAuthen {
  public username: String;
  public password: String;

  constructor(username: String, password: String) {
    this.password = password;
    this.username = username;
  }
}

@nearBindgen
export class Account {
  public accountAuthen: AccountAuthen;
  public accountProfile: AccountProfile;
  constructor(accountAuthen: AccountAuthen, accountProfile: AccountProfile) {
    this.accountAuthen = accountAuthen;
    this.accountProfile = accountProfile;
  }
}
