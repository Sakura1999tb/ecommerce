import { AccountAuthen, AccountProfile } from "./models/AccountProfile.model";
import gameCenter from "./mock/gameCenter";
// import fetch from "node-fetch";

// export  function get_profile(account: AccountAuthen): Promise<AccountProfile> {
//   const url = "http://localhost";
//   const _account = {
//     usernmae: account.username,
//     password: account.password,
//   };
//   const response =  fetch(url, {
//     method: "post",
//     body: JSON.stringify(_account),
//     headers: { "Content-Type": "application/json" },
//   });

//   const profile: AccountProfile = ( response.json()) as AccountProfile;

//   const acc = new AccountProfile(
//     profile.id,
//     profile.level,
//     profile.wallet,
//     profile.power
//   );

//   return acc;
// }

export function get_profile(
  account: AccountAuthen
): AccountProfile | null {
  const _account = gameCenter.getAccount(account.username, account.password);
  if (_account) {
    return _account.accountProfile;
  }
  return null;
}

export function compareProfile(
  profile1: AccountProfile,
  profile2: AccountProfile
): u64 {
  if (
    profile1.id == profile2.id &&
    profile1.level == profile2.level &&
    profile1.power == profile2.power &&
    profile1.wallet == profile2.wallet
  ) {
    return 1;
  }
  return 0;
}
