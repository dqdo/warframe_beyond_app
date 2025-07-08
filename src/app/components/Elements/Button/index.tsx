import styles from './Button.module.css';

type ButtonStyleVariant = 'default' | 'selectBuild' | 'warframeAbilities';

type ButtonProps = {
  text?: string;
  icon?: string | React.ReactNode;
  className?: string;
  iconSize?: string;
  variant?: ButtonStyleVariant;
  onClick?: () => void;
}

const variantStyles: Record<ButtonStyleVariant, string> = {
  default: `${styles.button} text-white text-xl sm:text-lg md:text-xl lg:text-xl border-none flex items-center cursor-pointer bg-transparent transition-transform duration-200 ease-in-out select-none active:scale-95`,
  selectBuild: `text-white sm:text-xs md:text-sm lg:text-base flex cursor-pointer border border-neutral-500 w-55 h-55 items-center justify-center`,
  warframeAbilities: `text-white flex cursor-pointer border border-neutral-600 w-12 h-12 items-center justify-center rounded-sm`
}

export default function Button({ text, icon, className = '', iconSize = 'w-10 h-10', variant = 'default', onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${variantStyles[variant]} ${className}`}>
      <span className="mr-1">
        {typeof icon === 'string' ? <img src={icon} className={`${iconSize}`} /> : icon}
      </span>
      <span>{text}</span>
    </button>
  );
}
