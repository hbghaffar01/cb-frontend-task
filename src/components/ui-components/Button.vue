<template>
    <button
      v-if="disabled"
      :id="id"
      :class="{ ...defaultButton }"
      :style="[
        loader ? 'cursor: not-allowed;' : 'cursor: pointer;',
        title && content !== 'iconOnly' ? 'gap: 4px' : 'gap: 0px',
      ]"
      class="inline-flex items-center focus:!ring-0 font-semibold capitalize whitespace-nowrap cursor-pointer justify-center"
    >
      <svg
        v-if="loader"
        aria-hidden="true"
        :class="[
          size == 'xs' || size == 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
          setSpinnerColor,
        ]"
        class="animate-spin text-white-50 absolute"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <svgIcon
        v-if="leftIconProperty"
        :icon="!loader ? icon : ''"
        :size="btnIconSize"
        
      />
      <span
        v-if="content !== 'iconOnly'"
        :class="[leftIconSpace, rightIconSpace, loader ? 'invisible' : '']"
      >
        <slot v-if="content !== 'iconOnly'"> {{ title }}</slot>
      </span>
      <svgIcon
        v-if="rightIconProperty"
        :icon="!loader ? icon : ''"
        :size="btnIconSize"
        
      />
    </button>
  
    <button
      v-else-if="!loader"
      v-bind="$attrs"
      :id="id"
      :class="{ ...defaultButton }"
      :style="[
        loader ? 'cursor: not-allowed;' : 'cursor: pointer;',
        title && content !== 'iconOnly' ? 'gap: 4px' : 'gap: 0px',
      ]"
      class="inline-flex items-center font-semibold capitalize whitespace-nowrap cursor-pointer justify-center"
    >
      <svg
        v-if="loader"
        aria-hidden="true"
        :class="[
          size == 'xs' || size == 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
          setSpinnerColor,
        ]"
        class="animate-spin text-white-50 absolute"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <svgIcon
        v-if="leftIconProperty"
        :icon="!loader ? icon : ''"
        :size="btnIconSize"
        
      />
      <span
        v-if="content !== 'iconOnly'"
        :class="[leftIconSpace, rightIconSpace, loader ? 'invisible' : '']"
      >
        <slot v-if="content !== 'iconOnly'"> {{ title }}</slot>
      </span>
      <svgIcon
        v-if="rightIconProperty"
        :icon="!loader ? icon : ''"
        :size="btnIconSize"
      />
    </button>
  
    <button
      v-else
      :id="id"
      :class="{ ...defaultButton }"
      :style="[loader ? 'cursor: not-allowed;' : 'cursor: pointer;']"
      class="inline-flex focus:!ring-0 items-center font-semibold capitalize whitespace-nowrap cursor-pointer justify-center"
    >
      <svg
        v-if="loader "
        aria-hidden="true"
        :class="[
          size == 'xs' || size == 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
          setSpinnerColor,
        ]"
        class="animate-spin text-white-50 absolute"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <div :class="loaderProperty"></div>
      <span
        v-if="content !== 'iconOnly'"
        :class="[leftIconSpace, rightIconSpace, loader ? 'invisible' : '']"
      >
        <slot> {{ title }}</slot>
      </span>
      <div :class="loaderProperty"></div>
    </button>
  </template>
  
  <script>
  import svgIcon from "./svgIcon.vue";
  export default {
    props: {
      loader: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String || Number,
        default: null,
      },
      icon: {
        type: String,
        default: "Circle",
      },
      title: {
        type: String,
        default: "button text",
      },
      block: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        validator: function (value) {
          // The value must match one of these strings
          return ["xs", "sm", "base", "lg", "xl"].indexOf(value) !== -1;
        },
        default: "base",
      },
      type: {
        type: String,
        validator: function (value) {
          // The value must match one of these strings
          return (
            ["primary", "secondary", "tertiary", "danger"].indexOf(value) !== -1
          );
        },
        default: "primary",
      },
      content: {
        type: String,
        validator: function (value) {
          // The value must match one of these strings
          return (
            ["textOnly", "leftIcon", "rightIcon", "iconOnly"].indexOf(value) !==
            -1
          );
        },
        required: false,
        default: "textOnly",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    inheritAttrs: false,
    computed: {
      defaultButton() {
        if (this.type == "primary") {
          return {
            "px-[7px] h-6 text-xs font-normal shadow-sm rounded":
              this.size === "xs",
            "px-[7px] h-7 text-sm  font-normal shadow-sm rounded-md":
              this.size === "sm",
            "px-2 h-8 text-sm font-normal shadow-sm rounded-md":
              this.size === "base",
            "px-2.5 h-9 text-sm font-normal shadow-sm rounded-md":
              this.size === "lg",
            "px-3 h-10 text-sm font-normal shadow-sm rounded-md":
              this.size === "xl",
            "!cursor-not-allowed !bg-gray-100 focus:!ring-0 shadow-sm relative !text-gray-400 hover:bg-gray-300":
              this.disabled,
            "w-full justify-center": this.block,
            "bg-blue-600 text-white hover:bg-blue-500 focus:ring focus:!ring-blue-400":
              this.type == "primary",
          };
        }
        if (this.type == "secondary") {
          return {
            "px-[7px] h-6 text-xs font-normal shadow-sm rounded":
              this.size === "xs",
            "px-[7px] h-7 text-sm  font-normal shadow-sm rounded-md":
              this.size === "sm",
            "px-2 h-8 text-sm font-normal shadow-sm rounded-md":
              this.size === "base",
            "px-2.5 h-9 text-sm font-normal shadow-sm rounded-md":
              this.size === "lg",
            "px-3 h-10 text-sm font-normal shadow-sm rounded-md":
              this.size === "xl",
            "!cursor-not-allowed !bg-gray-100 focus:!ring-0 shadow-sm relative !text-gray-400 hover:bg-gray-300":
              this.disabled,
            "w-full justify-center": this.block,
            "border-gray-300 text-gray-700 focus:ring focus:!ring-blue-500 border bg-white shadow-sm focus:outline-none":
              this.type == "secondary",
          };
        }
        if (this.type == "danger") {
          return {
            "px-[7px] h-6 text-xs font-normal shadow-sm rounded":
              this.size === "xs",
            "px-[7px] h-7 text-sm  font-normal shadow-sm rounded-md":
              this.size === "sm",
            "px-2 h-8 text-sm font-normal shadow-sm rounded-md":
              this.size === "base",
            "px-2.5 h-9 text-sm font-normal shadow-sm rounded-md":
              this.size === "lg",
            "px-3 h-10 text-sm font-normal shadow-sm rounded-md":
              this.size === "xl",
            "!cursor-not-allowed !bg-gray-100 focus:!ring-0 shadow-sm relative !text-gray-400 hover:bg-gray-300":
              this.disabled,
            "bg-red-600 text-white hover:bg-red-400 focus:ring focus:!ring-red-400":
              this.type == "danger",
            "w-full justify-center": this.block,
          };
        }
        if (this.type == "tertiary") {
          return {
            "px-[7px] h-6 text-xs bg-white rounded font-normal":
              this.size === "xs",
            "px-[7px] h-7 text-sm  bg-white rounded font-normal":
              this.size === "sm",
            "px-2 h-8 text-sm bg-white rounded font-normal":
              this.size === "base",
            "px-2.5 h-9 text-sm bg-white rounded font-normal":
              this.size === "lg",
            "px-3 h-10 text-sm bg-white rounded font-normal":
              this.size === "xl",
            "!cursor-not-allowed !text-gray-300 relative focus:!ring-0 hover:!bg-white rounded":
              this.disabled,
            "text-blue-600 !bd-white hover:bg-gray-50 focus:ring focus:!ring-gray-200":
              this.type == "tertiary",
            "w-full justify-center": this.block,
          };
        }
      },
      leftIconProperty() {
        if (this.content === "leftIcon") {
          return true;
        } else if (this.content === "iconOnly") {
          return true;
        }
      },
      rightIconProperty() {
        if (this.content === "rightIcon") {
          return true;
        } else if (this.content === "iconOnly") {
          return false;
        }
      },
      setSpinnerColor() {
        if (this.type === "danger") {
          return "fill-red-400";
        } else if (this.type === "primary") {
          return "fill-blue-400";
        } else if (this.type === "secondary") {
          return "fill-gray-300";
        } else if (this.type === "tertiary") {
          return "fill-gray-200";
        }
        return "fill-gray-200";
      },
      leftIconSpace() {
        if (
          this.content === "leftIcon" &&
          this.icon &&
          !this.loader &&
          this.$slots.default
        ) {
          return "ml-1.5";
        }
      },
      rightIconSpace() {
        if (
          this.content === "rightIcon" &&
          this.icon &&
          !this.loader &&
          this.$slots.default
        ) {
          return "mr-1.5";
        }
      },
      btnIconSize() {
        if (this.size == "xs") {
          return "16";
        } else if (this.size == "sm") {
          return "16";
        } else if (this.size == "base") {
          return "16";
        } else if (this.size == "lg") {
          return "20";
        } else if (this.size == "xl") {
          return "20";
        }
      },
      loaderProperty() {
        if (this.content === "textOnly") {
          return;
        } else if (this.content === "iconOnly") {
          if (this.size == "xs") {
            return "!w-2 !h-2";
          } else if (this.size == "sm") {
            return "!w-2 !h-2";
          } else if (this.size == "base") {
            return "!w-2 !h-2";
          } else if (this.size == "lg") {
            return "!w-2.5 !h-2.5";
          } else if (this.size == "xl") {
            return "!w-2.5 !h-2.5";
          }
        } else {
          if (this.size == "xs") {
            return "!w-2.5 !h-2.5";
          } else if (this.size == "sm") {
            return "!w-2.5 !h-2.5";
          } else if (this.size == "base") {
            return "!w-2.5 !h-2.5";
          } else if (this.size == "lg") {
            return "!w-3 !h-3";
          } else if (this.size == "xl") {
            return "!w-3 !h-3";
          }
        }
      },
    },
    components: {
      svgIcon,
    },
  };
  </script>
  
  <style lang="scss" scoped></style>