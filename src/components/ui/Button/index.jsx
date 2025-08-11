// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from 'clsx'

// Local Imports
import { COLORS } from "constants/app.constant";
import { setThisClass } from "utils/setThisClass";

// ----------------------------------------------------------------------

const variants = {
  filled:
    "bg-[#2A5A9D] text-white hover:bg-[#1A3A6C] focus:bg-[#1A3A6C] active:bg-[#1A3A6C]/90 disabled:bg-[#4A7EC3] dark:disabled:bg-[#1A3A6C]",
  soft: "text-[#2A5A9D] bg-[#D6E5F5] hover:bg-[#D6E5F5]/80 focus:bg-[#D6E5F5]/80 active:bg-[#D6E5F5]/60 dark:bg-[#2A5A9D]/10 dark:text-[#2A5A9D] dark:hover:bg-[#2A5A9D]/20 dark:focus:bg-[#2A5A9D]/20 dark:active:bg-[#2A5A9D]/25",
  outlined:
    "text-[#2A5A9D] border border-[#2A5A9D] hover:bg-[#2A5A9D]/5 focus:bg-[#2A5A9D]/5 active:bg-[#2A5A9D]/10 dark:border-[#2A5A9D] dark:text-[#2A5A9D] dark:hover:bg-[#2A5A9D]/5 dark:focus:bg-[#2A5A9D]/5 dark:active:bg-[#2A5A9D]/10",
  flat: "text-[#2A5A9D] hover:bg-[#2A5A9D]/8 focus:bg-[#2A5A9D]/8 active:bg-[#2A5A9D]/15 dark:text-[#2A5A9D] dark:hover:bg-[#2A5A9D]/10 dark:focus:bg-[#2A5A9D]/10 dark:active:bg-[#2A5A9D]/15",
};

const neutralVariants = {
  filled:
    "bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-50 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
  soft: "bg-gray-150/30 text-gray-900 hover:bg-gray-200/[.15] focus:bg-gray-200/[.15] active:bg-gray-200/20 dark:bg-dark-500/30 dark:text-dark-50 dark:hover:bg-dark-450/[.15] dark:focus:bg-dark-450/[.15] dark:active:bg-dark-450/20",
  outlined:
    "border border-gray-300 hover:bg-gray-300/20 focus:bg-gray-300/20 text-gray-900 active:bg-gray-300/25 dark:text-dark-50 dark:hover:bg-dark-300/20 dark:focus:bg-dark-300/20 dark:active:bg-dark-300/25 dark:border-dark-450",
  flat: "hover:bg-gray-300/20 focus:bg-gray-300/20 text-gray-700 active:bg-gray-300/25 dark:text-dark-200 dark:hover:bg-dark-300/10 dark:focus:bg-dark-300/10 dark:active:bg-dark-300/20",
};

const Button = forwardRef((props, ref) => {
  const {
    component,
    className,
    children,
    color,
    isIcon,
    variant = "filled",
    unstyled,
    type = "button",
    isGlow,
    disabled,
    onClick,
    ...rest
  } = props;

  const Component = component || "button";
  const mergedColor = color || "neutral";

  return (
    <Component
      className={clsx(
        "btn-base",
        !unstyled
          ? [
              "btn",
              isIcon && "shrink-0 p-0",
              mergedColor === "neutral"
                ? [
                    neutralVariants[variant],
                    isGlow &&
                      "shadow-lg shadow-gray-200/50 dark:shadow-dark-450/5",
                  ]
                : [
                    setThisClass(mergedColor),
                    variants[variant],
                    isGlow &&
                      "shadow-lg shadow-[#2A5A9D]/20 dark:shadow-lg dark:shadow-[#2A5A9D]/30",
                  ],
            ]
          : color && color !== "neutral" && setThisClass(color),
        className,
      )}
      type={type}
      ref={ref}
      disabled={disabled}
      data-disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Component>
  );
});

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  className: PropTypes.string,
  type: PropTypes.string,
  isIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(COLORS),
  variant: PropTypes.oneOf(["filled", "outlined", "soft", "flat"]),
  unstyled: PropTypes.bool,
  isGlow: PropTypes.bool,
};

export { Button };
