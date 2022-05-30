<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div id="ContentScreen" class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">Aperçu de mes évaluations</p>
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
          <div style="padding-top: 2rem" v-if="situationEvaluationSelectionner != null">
            <div class="d-flex row">
              <h4 class="text-dark p-5">Performance de ma classe :</h4>
              <div class="col-md-3" v-for="monGraphique in monAffichageGraphique" :key="monGraphique.id">
                <Chart
                  v-if="monGraphique.labels.length > 0"
                  type="pie"
                  :data="monGraphique"
                  :options="lightOptionsCammenbert"
                />
                <div class="d-flex justify-content-center p-2" v-if="monGraphique.labels.length > 0">
                  <strong>{{ monGraphique.critere }}</strong>
                </div>
              </div>
              <h4 class="text-dark p-5">Mes performances personnelles :</h4>
              <div
                class="col-md-6"
                v-for="monGraphiquePersonnel in monAffichageGraphiquePersonnel"
                :key="monGraphiquePersonnel.id"
              >
                <Chart
                  v-if="monGraphiquePersonnel.labels.length > 0"
                  :data="monGraphiquePersonnel"
                  :options="basicOptions"
                  :plugins="monGraphiquePersonnel.plugins"
                />
                <div class="d-flex justify-content-center p-2" v-if="monGraphiquePersonnel.labels.length > 0">
                  <strong>{{ monGraphiquePersonnel.critere }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 ms-3">
        <Button label="Retour vers mes évaluations" @click="router.push('/Accueil')"></Button>
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
import { useRouter } from 'vue-router';
import Role from '@/constants/Role';
import ObjectUtils from '@/utils/ObjectUtils';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import UserService from '@/services/UserService';
import EleveService from '@/services/EleveService';
import type { ApsaRetenu } from '@/models';

const { fetchEleveByUser, eleveByUser } = EleveService();
const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();

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
      display: false,
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
      display: false,
      labels: {
        color: '#495057',
      },
    },
  },
  scales: {
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
      max: 4,
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

interface datasetsEvaluation {
  data: number[];
  backgroundColor: string[];
}

const monAffichageGraphiquePersonnel = ref<EvaluationPersonnelle[]>([
  { datasets: [] as datasetsEvaluationPersonnelle[], plugins: [{}] } as EvaluationPersonnelle,
]);

interface datasetsEvaluationPersonnelle {
  display: boolean;
  type: string;
  label: string;
  data: number[];
  borderColor: string;
}

interface EvaluationPersonnelle {
  critere: string;
  id: number;
  labels: string[];
  datasets: datasetsEvaluationPersonnelle[];
  plugins: [{}];
}

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ELEVE)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    //Année ; APSA ; Etablissement
    await fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee(4, 25, 1);
    await fetchEleveByUser(user.value.id);
    // situationEvaluation.value = apsaSelectAnneeByApsaAndEtablissmenetAndAnnee.value.find(
    //   (asa) => asa.apsaRetenus
    // )?.apsaRetenus;
    apsaSelectAnneeByApsaAndEtablissmenetAndAnnee.value.forEach((asa) => {
      if (!isObjectEmpty(asa.apsaRetenus)) {
        asa.apsaRetenus.forEach((ar) => {
          situationEvaluation.value.push(ar);
        });
      }
    });
    libelleSport.value = apsaSelectAnneeByApsaAndEtablissmenetAndAnnee.value.find((asa) => asa)?.Apsa.libelle;
    isLoading.value = false;
  }
});

function onSituationEvaluationChange() {
  monAffichageGraphique.value = [];
  let indexGraphiqueClasseByCritere = 0;
  situationEvaluationSelectionner.value?.criteres.forEach((c) => {
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

  monAffichageGraphiquePersonnel.value = [];
  let indexGraphiqueClasseByCriterebyEleves = 0;
  situationEvaluationSelectionner.value?.criteres.forEach((c) => {
    const getOrCreateTooltip = (chart: any) => {
      let tooltipEl = chart.canvas.parentNode.querySelector('div');

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
      }

      return tooltipEl;
    };

    const externalTooltipHandler = (context: any) => {
      // Tooltip Element
      const { chart, tooltip } = context;
      const tooltipEl = getOrCreateTooltip(chart);

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: any) => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach((title: any) => {
          const tr = document.createElement('tr');
          tr.style.borderWidth = '0';

          const th = document.createElement('th');
          th.style.borderWidth = '0';
          const text = document.createTextNode(title);

          th.appendChild(text);
          tr.appendChild(th);
          tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body: any, i: any) => {
          const colors = tooltip.labelColors[i];

          const span = document.createElement('span');
          span.style.background = colors.backgroundColor;
          span.style.borderColor = colors.borderColor;
          span.style.borderWidth = '2px';
          span.style.marginRight = '10px';
          span.style.height = '10px';
          span.style.width = '10px';
          span.style.display = 'inline-block';

          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = '0';

          const td = document.createElement('td');
          td.style.borderWidth = '0';

          const text = document.createTextNode(body);

          td.appendChild(span);
          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
      }

      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY + 'px';
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
    };

    //Background color
    let pluginsForCritere = {};
    //Indicateur trié par ordre
    const sortedIndicateur = c.Indicateur.sort((a, b) => b.ordre - a.ordre);
    const nbIndicateur = sortedIndicateur.length;

    pluginsForCritere = {
      beforeDraw: function (chart: any) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
          scales: { x, y },
        } = chart;
        const heightItem = height / nbIndicateur;
        //Couleur des indicateurs
        sortedIndicateur.forEach((i, index) => {
          ctx.fillStyle = i.color;
          if (index === 0) ctx.fillRect(left, top, width, heightItem);
          else ctx.fillRect(left, top + heightItem * index, width, heightItem);
        });
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
      },
    };

    monAffichageGraphiquePersonnel.value[indexGraphiqueClasseByCriterebyEleves] = {
      critere: c.titre,
      id: indexGraphiqueClasseByCriterebyEleves,
      labels: [],
      datasets: [],
      plugins: [pluginsForCritere],
    };
    monAffichageGraphiquePersonnel.value[indexGraphiqueClasseByCriterebyEleves].datasets = [
      { type: 'bar', label: '', data: [], borderColor: '', display: true },
      { type: 'line', label: libelleSport.value, data: [], borderColor: 'black', display: true },
    ];
    c.Indicateur.forEach((i) => {
      if (i.evaluationEleves.find((f) => f.Eleve.id === eleveByUser.value.id)) {
        let nb = 0;
        let date = i.evaluationEleves.find((f) => f.Eleve.id === eleveByUser.value.id)?.Evaluation.DateEval + '';
        let datefinal = date.split('T')[0];
        let dateFormat = datefinal.split('-')[2] + '/' + datefinal.split('-')[1] + '/' + datefinal.split('-')[0];
        monAffichageGraphiquePersonnel.value[indexGraphiqueClasseByCriterebyEleves].labels.unshift(dateFormat);
        i.evaluationEleves.forEach((ee) => {
          if (ee.Eleve.id === eleveByUser.value.id) {
            monAffichageGraphiquePersonnel.value[indexGraphiqueClasseByCriterebyEleves].datasets[1].data.unshift(
              i.ordre - 0.5
            );
          }
        });
      }
    });
    indexGraphiqueClasseByCriterebyEleves++;
  });
}
</script>
