import {Problem, Scanner, Severity} from '../defs'

class InlineCheckBoxProblem implements Problem {
  constructor(result: RegExpExecArray) {
    this.code = result[0];
    this.fix = result[0].replace('k-checkbox', 'kf-inline').replace('CheckBoxFor', 'KendoCheckBoxFor');
    this.severity = Severity.High;
    this.type = 'InlineCheckBox';
  }
  code: string
  fix: string
  severity: Severity
  type: string

  applyFix(file: string): string {
    return file.replace(this.code, this.fix);
  }

}

export class InlineCheckBoxScanner implements Scanner {
  name = 'InlineCheckBox';

  pattern = /<div.*class="\s*(?<preclass>.*)\s*(?:k-checkbox)+\s*(?<postclass>.*)"(?<attributes>.*)>\s*@Html.CheckBoxFor\((?<args>.*)\)\s*(?<label>.*)(?:\s*<\/div>)+/gm;




  async scan(file: string): Promise<Problem[]> {
    const results: Problem[] = [];
    // console.log(file);
    let searching = true;
    while(searching) {
      let hits = this.pattern.exec(file);
      if(searching = !!hits) {
        results.push(new InlineCheckBoxProblem(hits));
      }
    }
    return results;
  }

}
