import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** When provided, renders as a router `Link` instead of a `<button>`. */
  to?: string;
}

export function Button({ variant = 'primary', size = 'md', children, to, ...rest }: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
