import { describe, it, expect, vi } from 'vitest';
import { render } from 'solid-js/web';
import Button from '../Button';

describe('Button Component', () => {
  // 测试用例 1：默认按钮渲染
  it('should render default button with primary variant and medium size', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    render(() => <Button>Default Button</Button>, container);
    
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Default Button');
    expect(button?.classList.contains('bg-blue-600')).toBe(true);
    expect(button?.classList.contains('px-4')).toBe(true);
    expect(button?.classList.contains('py-2')).toBe(true);
    
    document.body.removeChild(container);
  });

  // 测试用例 2：不同变体按钮渲染
  it('should render button with different variants', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    render(() => (
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </>
    ), container);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(4);
    
    expect(buttons[0].textContent).toBe('Primary');
    expect(buttons[0].classList.contains('bg-blue-600')).toBe(true);
    
    expect(buttons[1].textContent).toBe('Secondary');
    expect(buttons[1].classList.contains('bg-gray-600')).toBe(true);
    
    expect(buttons[2].textContent).toBe('Outline');
    expect(buttons[2].classList.contains('border')).toBe(true);
    
    expect(buttons[3].textContent).toBe('Ghost');
    expect(buttons[3].classList.contains('bg-transparent')).toBe(true);
    
    document.body.removeChild(container);
  });

  // 测试用例 3：不同尺寸按钮渲染
  it('should render button with different sizes', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    render(() => (
      <>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </>
    ), container);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(3);
    
    expect(buttons[0].textContent).toBe('Small');
    expect(buttons[0].classList.contains('px-3')).toBe(true);
    expect(buttons[0].classList.contains('py-1')).toBe(true);
    expect(buttons[0].classList.contains('text-sm')).toBe(true);
    
    expect(buttons[1].textContent).toBe('Medium');
    expect(buttons[1].classList.contains('px-4')).toBe(true);
    expect(buttons[1].classList.contains('py-2')).toBe(true);
    expect(buttons[1].classList.contains('text-base')).toBe(true);
    
    expect(buttons[2].textContent).toBe('Large');
    expect(buttons[2].classList.contains('px-6')).toBe(true);
    expect(buttons[2].classList.contains('py-3')).toBe(true);
    expect(buttons[2].classList.contains('text-lg')).toBe(true);
    
    document.body.removeChild(container);
  });

  // 测试用例 4：禁用状态按钮渲染
  it('should render disabled button with correct styles', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    render(() => <Button disabled>Disabled Button</Button>, container);
    
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Disabled Button');
    expect(button?.disabled).toBe(true);
    expect(button?.classList.contains('opacity-50')).toBe(true);
    expect(button?.classList.contains('cursor-not-allowed')).toBe(true);
    
    document.body.removeChild(container);
  });

  // 测试用例 5：按钮点击事件
  it('should handle click events', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    const handleClick = vi.fn();
    render(() => <Button onClick={handleClick}>Click Me</Button>, container);
    
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    
    button?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    document.body.removeChild(container);
  });
});