/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Button from "@/components/ui-components/Button.vue"

describe('Button.vue', () => {
  it('renders with default content correctly', () => {
    const wrapper = mount(Button)
    expect(wrapper.text()).toContain('button text')
  })

  it('renders with custom content correctly', () => {
    const customContent = 'Custom Button Content'
    const wrapper = mount(Button, {
      props: {
        content: 'textOnly',
        title: customContent
      }
    })
    expect(wrapper.text()).toContain(customContent)
  })

  it('renders as a block element when block prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        block: true
      }
    })
    expect(wrapper.classes()).toContain('w-full')
  })

  it('renders as a disabled button when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: false
      }
    })
    expect(wrapper.attributes('disabled'))
  })
})
