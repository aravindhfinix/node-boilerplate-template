import ngrok from 'ngrok';
import chalk from 'chalk';

const startNgrok = async (port) => {
  try {
    const url = await ngrok.connect({
      addr: port,
      proto: 'http',
      region: 'us'
    });
    console.log(chalk.whiteBright.bold(`Ngrok server base URL: ${chalk.greenBright.italic(url)}`));
    console.log(chalk.grey('(Use http://localhost:4040 to see ngrok server api history)'))
    return url;
  } catch (error) {
    console.error(chalk.red(`Error starting Ngrok: ${error}`));
  }
};

export { startNgrok };
