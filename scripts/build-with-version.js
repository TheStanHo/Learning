const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');
const packageJson = require('../package.json');

function getGitInfo() {
  try {
    const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    const commitHashShort = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    
    return {
      commitHash,
      commitHashShort,
      branch,
    };
  } catch (error) {
    // If git is not available (e.g., in some CI environments), return defaults
    console.warn('Git information not available, using defaults');
    return {
      commitHash: 'unknown',
      commitHashShort: 'unknown',
      branch: 'unknown',
    };
  }
}

function generateVersion() {
  const gitInfo = getGitInfo();
  const now = new Date();
  
  const versionInfo = {
    version: packageJson.version,
    commitHash: gitInfo.commitHash,
    commitHashShort: gitInfo.commitHashShort,
    branch: gitInfo.branch,
    buildTime: now.toISOString(),
    buildDate: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  return versionInfo;
}

// Generate version info
const versionInfo = generateVersion();

// Write to a JSON file that can be imported
const outputPath = join(process.cwd(), 'lib', 'version.json');
writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2), 'utf-8');

// Also create a formatted version string
const formattedVersion = `${versionInfo.version}+${versionInfo.commitHashShort} (${versionInfo.branch})`;
const versionStringPath = join(process.cwd(), 'lib', 'version.txt');
writeFileSync(versionStringPath, formattedVersion, 'utf-8');

console.log('Version info generated:');
console.log(`  Version: ${versionInfo.version}`);
console.log(`  Commit: ${versionInfo.commitHashShort}`);
console.log(`  Branch: ${versionInfo.branch}`);
console.log(`  Build: ${versionInfo.buildDate}`);
console.log(`  Full version: ${formattedVersion}`);
console.log('');

// Now run the actual build
console.log('Building Next.js application...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('\n✅ Build completed successfully!');
} catch (error) {
  console.error('\n❌ Build failed!');
  process.exit(1);
}

