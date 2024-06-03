const osu = require('node-os-utils');
const os = require('node:os');

const { cpu, drive, mem, netstat } = osu;

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

const netStatsInfos = async () => {
  const netInfos = await netstat.stats();
  const netInOutInfos = await netstat.inOut();
  console.log({ netInfos, netInOutInfos });
  return { netInfos, netInOutInfos };
};

const showPcInfos = async () => {
  const cpuInfo = await cpuInfos();
  const driveInfo = await driveDiskInfos();
  const memoryInfo = await memoryInfos();
  const netInfo = await netStatsInfos();

  console.log('CPU Info:', cpuInfo);
  console.log('Drive Info:', driveInfo);
  console.log('Memory Info:', memoryInfo);
  console.log('Network Info:', netInfo);

  os.cpus().forEach((cpu) => console.log(cpu));
  console.log({
    release: os.release(),
    totalmem: os.totalmem(),
    type: os.type(),
    arch: os.arch(),
    hostname: os.hostname(),
    machine: os.machine(),
    platform: os.platform(),
    version: os.version(),
  });
};

showPcInfos();
