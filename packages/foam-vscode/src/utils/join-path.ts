import { Uri } from 'vscode';

// Ported from vscode as it is for compatibility with theia
// https://github.com/eclipse-theia/theia/issues/8752

const Dot = '.'.charCodeAt(0);

function normalizePath(parts: string[]): string {
  const newParts: string[] = [];
  for (const part of parts) {
    if (
      part.length === 0 ||
      (part.length === 1 && part.charCodeAt(0) === Dot)
    ) {
      // ignore
    } else if (
      part.length === 2 &&
      part.charCodeAt(0) === Dot &&
      part.charCodeAt(1) === Dot
    ) {
      newParts.pop();
    } else {
      newParts.push(part);
    }
  }
  if (parts.length > 1 && parts[parts.length - 1].length === 0) {
    newParts.push('');
  }
  let res = newParts.join('/');
  if (parts[0].length === 0) {
    res = '/' + res;
  }
  return res;
}

export function joinPath(uri: Uri, ...paths: string[]): Uri {
  const parts = uri.path.split('/');
  for (let path of paths) {
    parts.push(...path.split('/'));
  }
  return uri.with({ path: normalizePath(parts) });
}
