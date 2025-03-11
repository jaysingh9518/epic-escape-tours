const { exec } = require('child_process');
const path = require('path');

// Define paths for frontend and backend
const frontendPath = path.join(__dirname, 'epicescapetours'); // Update with your frontend directory name
const backendPath = path.join(__dirname, 'nodejsapi'); // Update with your backend directory name

// Get the mode from command line arguments (default: development)
const mode = process.argv[2] || 'dev'; // Accepts 'dev' or 'prod'

console.log(`🚀 Starting application in ${mode === 'prod' ? 'Production' : 'Development'} mode...`);
console.log(`📂 Frontend path: ${frontendPath}`);
console.log(`📂 Backend path: ${backendPath}`);

// Function to start a process and log output
const startProcess = (command, workingDir, serviceName) => {
  const process = exec(command, { cwd: workingDir });

  process.stdout.on('data', (data) => console.log(`[${serviceName}] ${data}`));
  process.stderr.on('data', (data) => console.error(`[${serviceName} Error] ${data}`));
  process.on('close', (code) => console.log(`[${serviceName}] Process exited with code ${code}`));

  return process;
};

// Start backend server
const backendCommand = mode === 'prod' ? 'npm run start' : 'npm run dev';
const backend = startProcess(backendCommand, backendPath, 'Backend');

// Start frontend server
const frontendCommand = mode === 'prod' ? 'npm run build && npm run start' : 'npm run dev';
const frontend = startProcess(frontendCommand, frontendPath, 'Frontend');

console.log('✅ Servers are running. Press CTRL+C to stop.');
