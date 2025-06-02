export const validateInput = (taskName) => {
  const trimmed = taskName.trim();
  const isLengthValid = trimmed.length >= 3 && trimmed.length <= 150;
  const isSafe = !/[<>]/.test(trimmed);
  const isValidFormat = /^[A-Za-z0-9.,!?'"()\-: ]+$/.test(trimmed);
  return isLengthValid && isSafe && isValidFormat;
};
