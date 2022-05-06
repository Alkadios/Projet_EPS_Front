<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div id="ContentScreen" class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Personnalisation de l'équipe EPS <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
          <div>
            <div class="col-md-12">
              <div class="d-flex justify-content-center">
                <h4 class="text-dark mb-4">{{ libelleSport }}</h4>
              </div>
            </div>
          </div>
          <div>
            <div class="col-md-12">
              <div class="d-flex justify-content-center">
                <Dropdown
                  v-model="situationEvaluationSelectionner"
                  :options="situationEvaluation"
                  optionLabel="SituationEvaluation"
                  dataKey="id"
                  placeholder="Choisir une situation d'évaluation"
                  @change="onSituationEvaluationChange()"
                />
              </div>
            </div>
          </div>
          <div class="d-flex row" v-if="situationEvaluationSelectionner != null">
            <div class="p-5">
              <h4 class="text-dark mb-4">Performance de ma classe :</h4>
              <div v-for="monGraphique in monAffichageGraphique" :key="monGraphique.id">
                <div class="col-md-3">
                  <Chart
                    v-if="monGraphique.labels.length > 0"
                    type="pie"
                    :data="monGraphique"
                    :options="lightOptionsCammenbert"
                  />
                  <div v-if="monGraphique.labels.length > 0" class="d-flex justify-content-center p-2">
                    <B>{{ monGraphique.critere }}</B>
                  </div>
                </div>
              </div>

              <h4 class="text-dark mb-4">Mes performances personnelles :</h4>
              <Chart type="line" :data="basicData" :options="basicOptions" :plugins="quadrants" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 ms-3">
        <Button label="Annuler" @click="router.push('/TableauDeBordConfig')"></Button>
        <Button label="Terminer l'évaluation" icon="pi pi-check" style="left: 1rem"></Button>
      </div>
      <div class="mb-3"></div>
      <div style="position: fixed; bottom: 0; right: 2rem">
        <ProgressSpinner
          v-if="isLoading"
          style="float: right; width: 50px; height: 50px"
          strokeWidth="8"
          animationDuration=".5s"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import type { ApsaRetenu } from '@/models';

const route = useRoute();
const router = useRouter();

const { fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee, apsaSelectAnneeByApsaAndEtablissmenetAndAnnee } =
  ApsaSelectAnneeService();
const { etablissement, anneeEnCours } = UtilisateurService();
const isLoading = ref(false);

const situationEvaluation = ref<ApsaRetenu[]>([]);
const libelleSport = ref();
const situationEvaluationSelectionner = ref<ApsaRetenu>();
const monAffichageGraphique = ref<newAffichageGraphique[]>([
  { datasets: [] as datasetsEvaluation[] } as newAffichageGraphique,
]);
const lightOptionsCammenbert = ref({
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
});
interface newAffichageGraphique {
  critere: string;
  id: number;
  labels: string[];
  datasets: datasetsEvaluation[];
}

interface datasetsEvaluation {
  data: number[];
  backgroundColor: string[];
}
const basicOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
    quadrants: {
      topLeft: '#33EA0D',
      topRight: '#33EA0D',
      bottomRight: '#33EA0D',
      bottomLeft: '#33EA0D',
    },
  },
};

const basicData = ref({
  labels: ['22-04-2022', '06-05-2022', '15-06-2022'],
  datasets: [
    {
      label: 'Course de fond',
      data: [0, 3, 2],
      borderColor: '#FFA726',
      tension: 0.4,
    },
  ],
});

const quadrants = {
  id: 'quadrants',
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { left, top, right, bottom },
      scales: { x, y },
    } = chart;
    const midX = x.getPixelForValue(0);
    const midY = y.getPixelForValue(0);
    ctx.save();
    ctx.fillStyle = options.topLeft;
    ctx.fillRect(left, top, midX - left, midY - top);
    ctx.fillStyle = options.topRight;
    ctx.fillRect(midX, top, right - midX, midY - top);
    ctx.fillStyle = options.bottomRight;
    ctx.fillRect(midX, midY, right - midX, bottom - midY);
    ctx.fillStyle = options.bottomLeft;
    ctx.fillRect(left, midY, midX - left, bottom - midY);
    ctx.restore();
  },
};

onMounted(async () => {
  isLoading.value = true;
  await fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee(1, 1, 3);
  situationEvaluation.value = apsaSelectAnneeByApsaAndEtablissmenetAndAnnee.value.find(
    (asa) => asa.apsaRetenus
  )?.apsaRetenus;
  libelleSport.value = apsaSelectAnneeByApsaAndEtablissmenetAndAnnee.value.find((asa) => asa)?.Apsa.libelle;
  console.log('apsaselectannebyapsa : ', apsaSelectAnneeByApsaAndEtablissmenetAndAnnee.value);
  console.log('libelleSport : ', libelleSport.value);
  isLoading.value = false;
});

function onSituationEvaluationChange() {
  monAffichageGraphique.value = [];
  let indexGraphiqueClasseByCritere = 0;
  situationEvaluationSelectionner.value?.criteres.forEach((c) => {
    console.log('critere : ', c);
    monAffichageGraphique.value[indexGraphiqueClasseByCritere] = {
      critere: c.titre,
      id: indexGraphiqueClasseByCritere,
      labels: [],
      datasets: [],
    };
    monAffichageGraphique.value[indexGraphiqueClasseByCritere].datasets = [{ data: [], backgroundColor: [] }];
    c.Indicateur.forEach((i) => {
      monAffichageGraphique.value[indexGraphiqueClasseByCritere].labels.push(i.libelle);
      monAffichageGraphique.value[indexGraphiqueClasseByCritere].datasets[0].data.push(i.evaluationEleves.length);
      monAffichageGraphique.value[indexGraphiqueClasseByCritere].datasets[0].backgroundColor.push(i.color);
    });
    indexGraphiqueClasseByCritere++;
  });
  console.log('situationEvaluationSelectionner : ', situationEvaluationSelectionner.value);
}
</script>
