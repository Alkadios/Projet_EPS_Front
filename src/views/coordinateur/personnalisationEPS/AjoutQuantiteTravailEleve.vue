<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Card>
          <template #header>
            <h1 style="text-align: center">😭</h1>
          </template>
          <template #title> Advanced Card </template>
          <template #subtitle> Card subtitle </template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
              cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h1 style="text-align: center">😥</h1>
          </template>
          <template #title> Advanced Card </template>
          <template #subtitle> Card subtitle </template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
              cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h1 style="text-align: center">😄</h1>
          </template>
          <template #title> Advanced Card </template>
          <template #subtitle> Card subtitle </template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
              cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h1 style="text-align: center">😎</h1>
          </template>
          <template #title> Advanced Card </template>
          <template #subtitle> Card subtitle </template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
              cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div class="mb-3">
    <Button label="Ajouter les APSA sélectionnés" style="right: 1rem; top: 3rem" icon="pi pi-check" autofocus />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>
