import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import {scanners} from '../scanners';
import {Scanner} from '../defs';
import _ = require('lodash');
import highlight from 'cli-highlight'

export default class Scan extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ kfix scan`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{
    name: 'file',               // name of arg to show in help and reference with args[name]
    required: false,            // make the arg required with `required: true`
    description: 'input file', // help description
    // hidden: true,               // hide this arg from help
    parse: (input: string) => fs.readFileSync(input, 'utf8'),   // instead of the user input, return a different value
    default: 'C:\\Users\\stephen.austin\\Code\\SedonaOne_testing\\SedonaOne\\SedonaOne\\Areas\\Dealer\\Views\\Forte\\_PaymentTransactionAdd.cshtml',           // default value if no arg input
    // options: ['a', 'b'],        // only allow input to be from a discrete set
  }]

  async run() {
    const {args, flags} = this.parse(Scan)

    const file = fs.readFileSync(args.file, 'utf8');

    const problems = _.flatten(await Promise.all(scanners.map(async (x: Scanner) => await x.scan(file))));
    problems.forEach(x => {
      console.log(highlight(x.code));
      console.log('vvvvvvvvvvvvvvvv');
      console.log(highlight(x.fix));
      console.log('');
    })
  }
}
