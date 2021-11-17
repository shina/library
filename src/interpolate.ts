export function interpolate(text: string, vars: Record<string, string>) {
  return Object.entries(vars)
    .reduce((result: string, [key, value]) => {
      result = result
        .replace(`{{${key}}}`, value)
        .replace(`{{ ${key} }}`, value);
      return result;
    }, text);
}
