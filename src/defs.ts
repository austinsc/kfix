export enum Severity {
  High,
  Low
}

export interface Problem {
  type: string;
  code: string;
  severity: Severity;
  fix: string;
  applyFix(file: string): void;
}

export interface Scanner {
  name: string;
  scan(file: string ): Promise<Problem[]>;
}
