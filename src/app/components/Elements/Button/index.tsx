import styles from './Button.module.css';

type ButtonProps = {
    text: string;
    icon?: string | React.ReactNode;
    className?: string;
    iconSize?: string;
    variant?: 'default';
}

const variantStyles = {
    default: `${styles.button} text-white text-xl sm:text-lg md:text-xl lg:text-xl border-none flex items-center cursor-pointer bg-transparent transition-transform duration-200 ease-in-out select-none active:scale-95`,
}

export default function Button({ text, icon, className = '', iconSize = 'w-6 h-6', variant = 'default'}: ButtonProps) {
  return (
    <button className={`${variantStyles[variant]} ${className}`}>
      <span className="mr-1">
        {typeof icon === 'string' ? <img src={icon} className={`${iconSize}`} /> : icon}
      </span>
      <span>{text}</span>
    </button>
  );
}
