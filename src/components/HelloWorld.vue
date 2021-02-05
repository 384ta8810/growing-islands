<template>
  <div class="hello-world">
    <p>
      <button @click="onLoadClick">load</button>
      <button @click="onClearClick">clear</button>
    </p>
    <h3>Message: {{ message }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    loadMessage() {
      return new Promise((resolve) => {
        setTimeout(() => resolve("Hello world!"), 3000);
      });
    },
    async onLoadClick() {
      this.$store.commit("setLoading", true);
      this.message = await this.loadMessage();
      this.$store.commit("setLoading", false);
    },
    onClearClick() {
      this.message = "";
    },
  },
};
</script>
