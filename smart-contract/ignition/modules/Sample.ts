import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SampleModule = buildModule("SampleModule", (m) => {
  const sample = m.contract("Sample");
  return { sample };
});

export default SampleModule;
