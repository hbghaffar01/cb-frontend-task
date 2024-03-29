/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import svgIcon from "@/components/ui-components/svgIcon.vue"

describe('Svg Tets', () => {
  it('should render', () => {
    const wrapper = mount(svgIcon)
    expect(wrapper.find('component').exists())
  })
})