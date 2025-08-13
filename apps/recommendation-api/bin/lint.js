const { spawn } = require('child_process');

const isWin = process.platform === 'win32';
const pythonPath = isWin ? '.venv/Scripts/python.exe' : '.venv/bin/python';

const proc = spawn(pythonPath, ['-m', 'ruff', 'check', '.'], {
  stdio: 'inherit',
  cwd: __dirname + '/..'
});

proc.on('exit', process.exit);
