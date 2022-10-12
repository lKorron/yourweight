<template>
  <Transition name="popup" appear>
    <div
      v-if="isOpen"
      class="backdrop dark-background"
      @click="ignoreKeys ? '' : close()"
    >
      <div class="popup" @click.stop>
        <h2 class="popup__header"><slot name="header">Заголовок</slot></h2>
        <div class="popup__content">
          <slot
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            reprehenderit dolor et aut nostrum quisquam, nisi earum mollitia
            hic, impedit saepe! Reiciendis ipsam atque minima ducimus doloremque
            omnis iure quos.</slot
          >
        </div>

        <slot name="button"
          ><button class="button" @click="close">Закрыть</button></slot
        >
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    ignoreKeys: {
      type: Boolean,
      required: false,
    },
    darkBackground: {
      type: Boolean,
      required: false,
    },
  },

  popupController: null,

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    open() {
      let resolve;
      let reject;

      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });

      this.$options.popupController = { resolve, reject };

      //this.$options.popupController.resolve(true);
      this.isOpen = true;

      return promise;
    },
    close() {
      this.$options.popupController.resolve(true);
      this.isOpen = false;
      //emit
    },
    handleKeydown(evt) {
      if (this.ignoreKeys) {
        return;
      }

      if (evt.key === "Escape" && this.isOpen) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
@import "../styles/_mixins.scss";

.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dark-background {
  background-color: rgba($color: #000, $alpha: 0.3);
}

.popup {
  @include setPlane($maxWidth: 500px);
  margin-top: 100px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 20px;

  &__content {
    margin-bottom: 20px;

    p {
      text-align: justify;
      text-indent: 20px;
    }
  }

  button {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: transform 0.5s ease;
}

.popup-enter-from,
.popup-leave-to {
  transform: translateY(-100%) scale(0);
}
</style>
