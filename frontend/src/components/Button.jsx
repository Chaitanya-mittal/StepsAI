import { useMemo } from "react";
import { Link } from "react-router-dom";
function Button({
  type,
  children,
  to,
  onClick,
  size = "large",
  purpose,
  disabled,
}) {
  const initial = `rounded-sm text-center transition-all  duration-100 ease cursor-pointer`;
  const sizes = useMemo(() => {
    return {
      small: ` px-4 py-2 `,
      large: ` px-8 py-3 `,
    };
  }, [size]);
  const types = useMemo(() => {
    return {
      doctor: `${initial} ${sizes[size]} bg-red-500 text-white hover:bg-red-600`,
      patient: `${initial} ${sizes[size]}  bg-blue-500 text-white hover:bg-blue-600`,
      cancel: `${initial} ${sizes[size]}  border  text-stone-500 hover:bg-stone-100 `,
    };
  }, []);
  if (purpose)
    return (
      <button
        type={purpose}
        disabled={disabled}
        className={`${types[type]} ${sizes[size]}`}
      >
        {children}
      </button>
    );

  if (to) {
    return (
      <Link to={`${to}`} className={`${types[type]} ${sizes[size]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${types[type]} ${sizes[size]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
