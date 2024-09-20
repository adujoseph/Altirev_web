export const addThousandSeparator = (integer, separator) =>
  integer
    ?.toString()
    ?.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator ?? ","}`);
