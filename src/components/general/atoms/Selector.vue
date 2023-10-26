<template>
  <div>
    <button class="btn btn-info  dropdown-toggle" :style="style" type="button" id="dropdownMenuButton1"
      data-bs-toggle="dropdown" aria-expanded="false">
      {{ selectedName }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li v-for="item in items" :key="item.id">
        <a class="dropdown-item" @click="handleItemClick(item)">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    items: {
      type: Array,
      default: () => [],
      required: true
    },
    style: {
      type: String,
      required: false
    }
  },
  data() {

    const toggleDropdown = () => {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    const handleItemClick = (item) => {
      this.selectedName = item.label;
      this.isDropdownOpen = false;
      this.$emit('item-selected', item);
    }

    return {
      toggleDropdown,
      handleItemClick,
      isDropdownOpen: false,
      selectedName: this.name,
      dropdownId: `dropdown-${Math.random().toString(36).substr(2, 9)}`
    };
  },

};
</script>

<style scoped>
/* Ajusta el ancho y el margen del dropdown */
/* .dropdown-toggle {
  width: 18vh; 
  height: 6vh;
  margin-left: 15px; 
} */

/* Puedes personalizar más estilos aquí */
</style>