export const formatKey = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());