<template>
  <div class="modal" @click="closeModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
  
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true 
    },
    
    produtPresent: {
      type: Boolean,
      default: false
    },

  },

  setup(props, {emit}){
    const closeModal = (event: any) => {
      if (event.target === event.currentTarget) {
        emit('close');
      }
    }

    return {
      closeModal,
    }

  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  max-width: 90%;
}

.modal-content {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.close {
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>


  