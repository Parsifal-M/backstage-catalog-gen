export const parseAnnotations = (text: string): Record<string, string> => {
  const annotations: Record<string, string> = {};
  const lines = text.split("\n");

  for (const line of lines) {
    const parts = line.split(":");
    if (parts.length === 2) {
      const key = parts[0].trim();
      const value = parts[1].trim();
      if (key && value) {
        annotations[key] = value;
      }
    }
  }

  return annotations;
};
