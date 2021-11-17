export function interpolate(text: string, vars: Record<string, string>) {
  return Object.entries(vars)
    .reduce((result: string, [key, value]) => {
      return result
        .replaceAll(`{{${key}}}`, value)
        .replaceAll(`{{ ${key} }}`, value);
    }, text);
}
