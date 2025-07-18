
import cn from "classnames";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  variant?: 'default' | 'load';
}


export const Button = ({ text, onClick, disabled, className, ariaLabel, variant }: ButtonProps) => {
  return  <button
  className={cn(
    styles.button,
    variant && styles[`${variant}Button`],
    className
  )}
  onClick={onClick}
  disabled={disabled}
  aria-label={ariaLabel}
>
  {text}
</button>;
};
