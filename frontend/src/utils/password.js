export const validatePassword = (password) => {
  const criteria = [
    { regex: /(?=.*[A-Z])/, label: "At least one uppercase letter" },
    { regex: /(?=.*[0-9])/, label: "At least one number" },
    { regex: /(?=.*[!@#$%^&*])/, label: "At least one special character" },
    { regex: /.{8,}/, label: "At least 8 characters long" },
  ];

  return criteria.map((criterion) => ({
    label: criterion.label,
    isMet: criterion.regex.test(password),
  }));
};
