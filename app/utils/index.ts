export const addThousandSeparator = (integer:string|number) =>
  integer
    ?.toString()
    ?.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${","}`);
