const osu = require('node-os-utils');

const cpu = osu.cpu;
const drive = osu.drive;

const cpuInfos = async () => {
  const percentage = await cpu.usage();
  const model = cpu.model();
  const free = await cpu.free();
  const cores = cpu.count();

  const cpuInfos = {
    model,
    cores,
    percentage,
    free,
  };

  console.log(cpuInfos);
  return cpuInfos;
};

const driveDiskInfos = async () => {
  const driveInfos = await drive.info();
  console.log(driveInfos);
  return driveInfos;
};

const showPcInfos = async () => {
  cpuInfos();
  driveDiskInfos();
};

showPcInfos();
