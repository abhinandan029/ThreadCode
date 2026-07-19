export function runCode(code) {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push({
      type: 'log',
      text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
    });
  };

  try {
    const result = new Function(code)();
    if (result !== undefined) {
      logs.push({
        type: 'log',
        text: `=> ${typeof result === 'object' ? JSON.stringify(result) : String(result)}`
      });
    }
  } catch (error) {
    logs.push({ type: 'error', text: `Error: ${error.message}` });
  } finally {
    console.log = originalLog;
  }

  return logs;
}