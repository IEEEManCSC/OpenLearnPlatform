const { spawn } = require('child_process');

const isWin = process.platform === 'win32';
const pythonPath = isWin ? '.venv/Scripts/python.exe' : '.venv/bin/python';

const proc = spawn(pythonPath, ['-m', 'uvicorn', 'recommender:app', '--reload', '--port', '8000'], {
  stdio: 'inherit',
  cwd: __dirname + '/..'
});

proc.on('exit', process.exit);
