function Error({ children, check }) {
  if (check) {
    return (
      <li
        className={`text-xs ${check === "on" ? "text-green-500" : "text-red-500 dark:text-orange-400"} mt-1`}
      >
        <span>
          {check === "on" ? "✅" : "❌"} {children}
        </span>
      </li>
    );
  }
  return (
    <p className="mt-1 text-xs text-red-500 dark:text-orange-400">{children}</p>
  );
}

export default Error;
