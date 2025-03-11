// utils/emailHelpers.js

/**
 * Extracts and capitalizes the name part of an email.
 * Example: "gopi@istreams.com" -> "Gopi"
 */
export const getNameFromEmail = (email) => {
  if (!email) return "";
  const [name] = email.split("@");
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * Extracts the domain part of an email.
 * Example: "gopi@istreams.com" -> "istreams.com"
 */
export const getDomainFromEmail = (email) => {
  if (!email) return "";
  const parts = email.split("@");
  return parts[1] || "";
};
