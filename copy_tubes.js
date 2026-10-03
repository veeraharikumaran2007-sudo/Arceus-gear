const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\mohan\\.gemini\\antigravity\\brain\\73554586-518a-4e1d-a082-9e2978a3681b\\.system_generated\\steps\\1702\\content.md';
const content = fs.readFileSync(srcPath, 'utf8');
const marker = '/**\n * @license';
const jsCode = content.slice(content.indexOf(marker));

const destPath = path.join(__dirname, 'client', 'public', 'tubes1.min.js');
fs.writeFileSync(destPath, jsCode, 'utf8');
console.log('Saved client/public/tubes1.min.js, bytes:', jsCode.length);
