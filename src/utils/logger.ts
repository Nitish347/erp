export function logInfo(message: string, extra?: unknown): void {
  // eslint-disable-next-line no-console
  console.log(message, extra ?? '');
}

export function logError(message: string, extra?: unknown): void {
  // eslint-disable-next-line no-console
  console.error(message, extra ?? '');
}


