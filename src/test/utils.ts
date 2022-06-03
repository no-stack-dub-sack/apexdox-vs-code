export const isWhiteSpaceOnlyDiff = (fileReference: string, fileSnapshot: string): boolean => {
  const referenceWhiteSpace = fileReference.replace(/[^\s]/g, '');
  const snapshotWhiteSpace = fileSnapshot.replace(/[^\s]/g, '');
  const referenceMinified = fileReference.replace(/\s/g, '');
  const snapshotMinified = fileSnapshot.replace(/\s/g, '');

  // to avoid showing misleading diffs when whitespace only diff, calculate whitespace diff first
  if (referenceMinified === snapshotMinified && snapshotWhiteSpace !== referenceWhiteSpace) {
    // Instead, use another diffing tool like Meld to understand what's changed.
    return true;
  }

  return false;
};

export const isolateDiffs = (
  fileReference: string[],
  fileSnapshot: string[]
): {
  finalReference: string;
  finalSnapshot: string;
} => {
  let start = 0,
    end = 0;
  while (fileReference[start] === fileSnapshot[start]) {
    start++;
  }

  fileReference = fileReference.slice(start);
  fileSnapshot = fileSnapshot.slice(start);

  let i = fileReference.length - 1;
  let j = fileSnapshot.length - 1;
  while (fileReference[i] === fileSnapshot[j]) {
    i--;
    j--;
    end--;
  }

  return {
    finalReference: fileReference.slice(0, end).join('\n'),
    finalSnapshot: fileSnapshot.slice(0, end).join('\n'),
  };
};
