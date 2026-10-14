import bcryptjs from "bcryptjs";

export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export async function hashPassword(password) {
  const salt = await bcryptjs.genSalt(10);

  const hashPass = await bcryptjs.hash(password, salt);

  return hashPass;
}

export const comparePass = async (Pass, HashPass) => {
  const result = await bcryptjs.compare(Pass, HashPass);

  return result;
};
