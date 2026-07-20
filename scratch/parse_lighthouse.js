import fs from 'fs';

try {
  const logPath = 'C:/Users/biel3/.gemini/antigravity-ide/brain/eede5097-6b0f-42a1-ac19-c3a8b56d8f82/.system_generated/tasks/task-1266.log';
  const content = fs.readFileSync(logPath, 'utf8');
  
  let startIdx = content.indexOf('{');
  if (startIdx === -1) {
    console.error('No JSON start found');
    process.exit(1);
  }
  
  let braceCount = 0;
  let jsonStr = '';
  for (let i = startIdx; i < content.length; i++) {
    const char = content[i];
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    jsonStr += char;
    if (braceCount === 0 && jsonStr.length > 10) {
      break;
    }
  }
  
  const data = JSON.parse(jsonStr);
  const audits = data.audits;
  const categories = data.categories;
  
  console.log(JSON.stringify({
    scores: {
      performance: categories?.performance?.score * 100,
      accessibility: categories?.accessibility?.score * 100,
      bestPractices: categories?.['best-practices']?.score * 100,
      seo: categories?.seo?.score * 100
    },
    serverResponseTime: audits['server-response-time']?.displayValue,
    firstContentfulPaint: audits['first-contentful-paint']?.displayValue,
    largestContentfulPaint: audits['largest-contentful-paint']?.displayValue,
    interactive: audits['interactive']?.displayValue,
    speedIndex: audits['speed-index']?.displayValue,
    totalBlockingTime: audits['total-blocking-time']?.displayValue,
    bootupTime: audits['bootup-time']?.details?.items
  }, null, 2));
} catch (err) {
  console.error('Error parsing:', err);
}
