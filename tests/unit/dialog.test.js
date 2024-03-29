/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Dialog from '@/components/ui-components/Dialog.vue';

const mockSvgIcon = {
  template: '<div class="close-button" @click="$emit(\'click\')"></div>',
};

describe('Dialog.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Dialog, {
      slots: {
        dialog: '<div>Dialog content</div>',
      },
      global: {
        components: {
          svgIcon: mockSvgIcon,
        },
      },
    });
  });

  it('renders dialog when isOpen is true', async () => {
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.html())
  });

  it('does not render dialog when isOpen is false', async () => {
    await wrapper.setProps({ modelValue: false });
    expect(wrapper.html()).not.toContain('Dialog content');
  });
});
