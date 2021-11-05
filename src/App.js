import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  console.log("contract", contract);

  // useEffect(() => {
  //   // TODO: don't just fetch once; subscribe!
  //   contract.getContracts().then((contracts) => {
  //     console.log("contracts", contracts);
  //   });
  // }, []);

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR Guest Book");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract
      .createContract(
        {
          contractInfomation: {
            price: "1",
            accountProfile: { id: "1", level: "1", wallet: "1", power: "1" },
            account: { username: "", password: "" },
          },
          receiver: "receiver.testnet",
        },
        BOATLOAD_OF_GAS,
        Big("0")
          .times(10 ** 24)
          .toFixed()
      )
      .then((status) => {
        console.log("status", status);
      });
  };

  const onGet = (e) => {
    e.preventDefault();

    console.log("get");
    contract.getContracts().then((contracts) => {
      console.log("contracts", contracts);
    });
  };

  return (
    <main>
      <div>Hello world</div>
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={(e) => onSubmit(e)}>Oke</button>
      <button onClick={(e) => onGet(e)}>Get</button>
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    getContracts: PropTypes.func.isRequired,
    createContract: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
  }).isRequired,
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
