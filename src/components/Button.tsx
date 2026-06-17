import { Component, JSX, splitProps } from 'solid-js';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: () => void;
  [key: string]: any;
}

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['variant', 'size', 'disabled', 'children']);
  
  const variant = local.variant || 'primary';
  const size = local.size || 'medium';
  const disabled = local.disabled || false;

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700';
      case 'outline':
        return 'bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100';
      case 'ghost':
        return 'bg-transparent text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1 text-sm';
      case 'medium':
        return 'px-4 py-2 text-base';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const classes = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    font-medium rounded-md transition-colors duration-200
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  return (
    <button
      {...rest}
      class={classes}
      disabled={disabled}
    >
      {local.children}
    </button>
  );
};

// 创建 web component
// defineCustomElement('solid-button', Button);

export default Button;