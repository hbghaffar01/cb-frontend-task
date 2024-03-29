/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputField from '@/components/ui-components/Input.vue';

describe('InputField.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(InputField);

    expect(wrapper.find('label').text()).toBe('Email');

    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('placeholder')).toBe('Email');
    expect(wrapper.find('.text-red-400').exists()).toBe(false);
  });

  it('renders correctly with custom props', () => {
    const props = {
      type: 'password',
      disabled: true,
      modelValue: 'test@example.com',
      label: 'Custom Label',
      placeholder: 'Enter your email',
      error: 'Invalid email address',
    };

    const wrapper = mount(InputField, {
      props,
    });

    expect(wrapper.find('label').text()).toBe('Custom Label');

    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('password');
    expect(input.attributes('placeholder')).toBe('Enter your email');

    expect(input.element.value).toBe('test@example.com');
    const errorMessage = wrapper.find('.text-red-400');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Invalid email address');
  });

  it('emits input event on input', async () => {
    const wrapper = mount(InputField);
    const input = wrapper.find('input');

    await input.setValue('test@example.com');
  });
});
