<template>
  <content-panel back-button class="top-panel">
    <template #header>О приложении</template>
    <template #default>
      <article class="about-article">
        <p>
          Укажите свои данные для расчета необходимых калорий. С учетом
          вычесленных значений вы можете заполнять отдельные дни данными о
          съеденной пище (пока поиск работает только на английском языке).
        </p>
        <p>
          Во вкладке "прогресс по датам" можно добавлять, удалять или
          редактировать данные за определенные дни
        </p>
        <p>
          По введенным данным выстравиается график - по оси x даты, по оси y -
          количество калорий. Ломаная линия - ваш личный прогресс, две прямые -
          количество килокалорий для поддержания и изменения веса.
        </p>
        <p>
          Кнопка с весами позволяет изменять вес по мере прогресса, в
          зависимости от него автоматически пересчитываются показатели
          килокалорий. Кнопка сброса полностью обнуляет данные приложения при
          вводе соответствующей фразы.
        </p>
      </article>

      <section class="developers">
        <div class="developers__row row">
          <h3 class="row__header">Разработка + верстка:</h3>
          <a href="https://github.com/lKorron" target="_blank"
            >github.com/lKorron</a
          >
        </div>
        <div class="developers__row row">
          <h3 class="row__header">Дизайн:</h3>
          <a href="http://" target="_blank">github.com/Степа</a>
        </div>
      </section>
    </template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "@/components/ContentPanel.vue";
</script>

<style lang="scss" scoped>
@import "../styles/classes";
.about-article {
  padding: 10px;
  p {
    text-indent: 20px;
    text-align: justify;
    max-width: 500px;
    margin: 0 auto;
  }

  p:not(:last-child) {
    margin-bottom: 20px;
  }
}

.developers {
  margin: 0 auto;
  margin-top: 20px;
  max-width: 400px;
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.row {
  &__header {
    margin: 0;
  }

  @media (max-width: $md3) {
    display: block;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
