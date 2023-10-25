<template>
  <div class="form-floating mt-4">
    <input :type="inputType" class="form-control" :id="inputId" :value="inputValue" @input="updateValue($event)"
      :placeholder="placeholder">
    <label v-if="label" :for="inputId">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    type: {
      type: String,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    }
  },
  setup(props, { emit }) {

    const inputId = `floatingInput-${Math.random().toString(36).substr(2, 9)}`;
    const inputValue = ref<string>(props.modelValue || '');
    const inputType = ref<string>(props.type ? props.type : 'text');

    const updateValue = (event: InputEvent) => {
      const value = event.target instanceof HTMLInputElement ? event.target.value : '';
      inputValue.value = value;
      emit('update:modelValue', value);
    };

    return {
      inputId,
      inputType,
      updateValue,
      inputValue
    };
  }
});
</script>
