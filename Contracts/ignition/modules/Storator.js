const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Storator", (m) => {
  const storator = m.contract("Storator", ["0x0A0f4321214BB6C7811dD8a71cF587bdaF03f0A0"]);

  m.call(storator, "estimateFee", []);

  return { storator };
});