import type { ComponentProps } from 'react';
import styles from './ui.module.css';

type Variant = 'primary' | 'surface';

type ButtonProps = { variant?: Variant } & (
  ({ href: string } & ComponentProps<'a'>) | ({ href?: undefined } & ComponentProps<'button'>)
);

/** Renders a link when given href, otherwise a button. */
export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;
  if (props.href !== undefined) {
    return <a className={classes} {...(props as ComponentProps<'a'>)} />;
  }
  return <button className={classes} type="button" {...(props as ComponentProps<'button'>)} />;
}
