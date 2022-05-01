import { computed } from 'vue';
import { useStore } from 'vuex';
import { EvaluationEleve } from '@/models';

export default function EvaluationEleveService() {
  const store = useStore();

  const evaluationEleves = computed((): EvaluationEleve[] => {
    return store.getters['EvaluationEleveModule/getEvaluationEleves'];
  });
  async function fetchAllEvaluationEleve() {
    await store.dispatch('EvaluationEleveModule/fetchAllEvaluationEleve');
  }

  const evaluationElevesByAnneeAndEtablissement = computed((): EvaluationEleve[] => {
    return store.getters['EvaluationEleveModule/getEvaluationElevesByAnneeAndEtablissement'];
  });

  async function fetchEvaluationEleveByAnneeAndEtablissement() {
    await store.dispatch('EvaluationEleveModule/fetchEvaluationEleveByAnneeAndEtablissement');
  }
  async function saveEvaluationEleve(
    Date: string,
    evaluationEleve: [
      {
        Indicateur: string;
        Eleve: string;
        autoEval: boolean;
      }
    ]
  ) {
    await store.dispatch('EvaluationEleveModule/saveEvaluationEleve', { Date, evaluationEleve });
  }

  return {
    evaluationEleves,
    fetchAllEvaluationEleve,
    evaluationElevesByAnneeAndEtablissement,
    fetchEvaluationEleveByAnneeAndEtablissement,
    saveEvaluationEleve,
  };
}
