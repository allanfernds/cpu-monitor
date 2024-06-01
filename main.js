const osu = require('node-os-utils');

const cpu = osu.cpu;
const drive = osu.drive;
const mem = osu.mem;
const os = osu.os;

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

const memoryInfos = async () => {
  const memInfos = await mem.info();
  console.log(memInfos);
  return memInfos;
};

const osInfos = async () => {
  const oos = await os.oos();
  const platform = os.platform();
  const arch = os.arch();
  const type = os.type();
  const uptime = os.uptime();
  const hostname = os.hostname();
  const ip = os.ip();

  const allInfos = {
    platform,
    oos,
    arch,
    type,
    uptime,
    ip,
    hostname,
  };

  console.log(allInfos);
  return allInfos;
};

const showPcInfos = async () => {
  cpuInfos();
  driveDiskInfos();
  memoryInfos();
  osInfos();
};

showPcInfos();
