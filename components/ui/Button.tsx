type BaseProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
}

type LinkProps = BaseProps & {
  href: string
  onClick?: never
  disabled?: never
  type?: never
}

type ButtonProps = BaseProps & {
  href?: never
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

type Props = LinkProps | ButtonProps

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-medium transition-all duration-300 focus-visible:outline-offset-2'

const variantClasses = {
  primary:
    'bg-accent text-white hover:bg-accent-hover hover:scale-[1.02] hover:shadow-btn-hover',
  secondary:
    'border border-accent/40 text-accent bg-transparent hover:bg-accent/[0.06] hover:border-accent hover:scale-[1.02]',
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: Props) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes} rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  const { onClick, disabled, type = 'button' } = props as ButtonProps
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  )
}
