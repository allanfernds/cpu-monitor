const osu = require('node-os-utils');
const os = require('node:os');

const { cpu, drive, mem, netstat } = osu;

const cpuInfos = async () => {
  const percentage = await cpu.usage();
  const model = cpu.model();
  const free = await cpu.free();
  const cores = cpu.count();

  return { model, cores, percentage, free };
};

const driveDiskInfos = async () => {
  return await drive.info();
};

const memoryInfos = async () => {
  return await mem.info();
};

const netStatsInfos = async () => {
  const netInfos = await netstat.stats();
  const netInOutInfos = await netstat.inOut();
  return { netInfos, netInOutInfos };
};

const formatTable = async (title, data) => {
  const chalk = (await import('chalk')).default;
  const Table = (await import('cli-table')).default;

  const table = new Table({ head: [chalk.cyan(title), chalk.cyan('Info')] });
  Object.entries(data).forEach(([key, value]) => {
    table.push([chalk.green(key), value]);
  });
  console.log(table.toString());
};

const showPcInfos = async () => {
  const chalk = (await import('chalk')).default;

  const cpuInfo = await cpuInfos();
  const driveInfo = await driveDiskInfos();
  const memoryInfo = await memoryInfos();
  const netInfo = await netStatsInfos();

  console.log(chalk.bold.blue('CPU Info:'));
  await formatTable('CPU', cpuInfo);

  console.log(chalk.bold.blue('Drive Info:'));
  await formatTable('Drive', driveInfo);

  console.log(chalk.bold.blue('Memory Info:'));
  await formatTable('Memory', memoryInfo);

  console.log(chalk.bold.blue('Network Info:'));
  await formatTable('Network', netInfo);

  console.log(chalk.bold.blue('System Info:'));
  const systemInfo = {
    release: os.release(),
    totalmem: os.totalmem(),
    type: os.type(),
    arch: os.arch(),
    hostname: os.hostname(),
    machine: os.machine(),
    platform: os.platform(),
    version: os.version(),
  };
  await formatTable('System', systemInfo);

  console.log(chalk.bold.blue('CPU Details:'));
  os.cpus().forEach((cpu, index) => {
    console.log(chalk.green(`Core ${index + 1}:`));
    console.table(cpu);
  });
};

showPcInfos();
