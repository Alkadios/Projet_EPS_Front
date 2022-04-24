<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Personnalisation de l'équipe EPS <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
          <div id="mesClasses">
            <div class="row">
              <div class="d-flex p-2">
                <div>Mes Classes :</div>
                <div style="position: relative; left: 0.5rem">
                  <Dropdown
                    v-model="maClasseSelect"
                    :options="cities"
                    optionLabel="name"
                    optionValue="code"
                    placeholder="Ma Classe"
                    @change="maClasse()"
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="myTable">
            <div class="row">
              <div>
                <InputText id="mySearch" v-model="mySearch" v-on:keyup="filterTable()" placeholder="Keyword Search" />
              </div>
              <div class="d-flex p-2">
                <div class="col-12">
                  <DataTable
                    :value="filteredProduct"
                    :paginator="true"
                    :rows="15"
                    showGridlines
                    responsiveLayout="scroll"
                  >
                    <Column field="name" header="Name"></Column>
                    <Column header="Code">
                      <template #body="slotProps">
                        <Dropdown
                          v-model="slotProps.data.Dropdown"
                          :options="cities"
                          optionLabel="name"
                          optionValue="code"
                          placeholder="Ma Classe"
                          @change="maClasse()"
                        /> </template
                    ></Column>
                    <Column field="category" header="Category">
                      <template #body="slotProps">
                        <Dropdown
                          v-model="slotProps.data.Dropdown"
                          :options="cities"
                          optionLabel="name"
                          optionValue="code"
                          placeholder="Ma Classe"
                          @change="maClasse()"
                        /> </template
                    ></Column>
                    <Column field="quantity" header="Quantity">
                      <template #body="slotProps">
                        <Dropdown
                          v-model="slotProps.data.Dropdown"
                          :options="cities"
                          optionLabel="name"
                          optionValue="code"
                          placeholder="Ma Classe"
                          @change="maClasse()"
                        /> </template
                    ></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-3"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import UtilisateurService from '@/services/UtilisateurService';
const mySearch = ref();
const { etablissement } = UtilisateurService();
const products = ref([
  { name: 'New York', code: '', category: '', quantity: '' },
  { name: 'Rome', code: '', category: '', quantity: '' },
  { name: 'London', code: '', category: '', quantity: '' },
  { name: 'Istanbul', code: '', category: '', quantity: '' },
  { name: 'Paris', code: '', category: '', quantity: '' },
]);
const filteredProduct = ref(products.value);
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);

const mesIndicateurs = ref([
  { name: 'Test non réalisé', code: '0' },
  { name: 'Maitrise insuffisante', code: '1' },
  { name: 'Maitrise fragile', code: '2' },
  { name: 'Maitrise satisfaisante', code: '3' },
  { name: 'Très bonne maitrise', code: '4' },
]);

const maClasseSelect = ref();

function filterTable() {
  if (mySearch.value) {
    filteredProduct.value = products.value.filter((data) => data.name.includes(mySearch.value));
  } else {
    filteredProduct.value = products.value;
  }
}

function maClasse() {
  console.log('ma Classe : ', maClasseSelect.value);
}
onMounted(async () => {});
</script>
