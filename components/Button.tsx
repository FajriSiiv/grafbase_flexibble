import Image from "next/image";
import React, { MouseEventHandler } from "react";

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  type?: "button" | "submit";
  textColor?: string;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  bgColor,
  type,
  textColor,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`
        ${textColor || "text-white"}
      flexCenter gap-3 px-4 py-3 ${
        isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}

      {title}

      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
