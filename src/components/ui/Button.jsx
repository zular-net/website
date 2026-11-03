import styles from './ui.module.css';

// Renders a link when given href, otherwise a button.
export default function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;
  if (href) return <a className={classes} href={href} {...props}>{children}</a>;
  return <button className={classes} type="button" {...props}>{children}</button>;
}
