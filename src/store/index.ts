import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import UtilisateurModule from '@/store/modules/utilisateur/index';
import ChampApprentissageModule from '@/store/modules/champApprentissage/index';
import ApsaModule from '@/store/modules/apsa/index';
import AfModule from '@/store/modules/af/index';
import AfRetenusModule from '@/store/modules/afRetenus/index';
import ApsaSelectAnneeModule from '@/store/modules/ApsaSelectAnnee/index';
import ChoixAnneeModule from '@/store/modules/choixAnnee/index';
import ApsaRetenuModule from '@/store/modules/ApsaRetenu/index';
import CritereModule from '@/store/modules/critere/index';
import ProfesseurClassesModule from '@/store/modules/professeurClasses/index';
import EleveModule from '@/store/modules/eleve/index';
import ClasseModule from '@/store/modules/classe/index';
import EvaluationEleveModule from '@/store/modules/evaluationEleve/index';
import IndicateurModule from '@/store/modules/indicateur/index';
import AnneeModule from '@/store/modules/annee/index';

const keyLocalStorage = 'ocpepsstore';

export function getLocalStorage(module: string, property: string): any {
  const storage = localStorage.getItem(keyLocalStorage);
  if (storage === null) return null;
  const sto = JSON.parse(storage);
  let mod = sto[module];
  if (mod === undefined) mod = module;
  const prop = mod[property];
  return prop;
}

export default createStore({
  modules: {
    UtilisateurModule,
    ChampApprentissageModule,
    ApsaModule,
    AfModule,
    AfRetenusModule,
    ApsaSelectAnneeModule,
    ChoixAnneeModule,
    ApsaRetenuModule,
    CritereModule,
    ProfesseurClassesModule,
    EleveModule,
    ClasseModule,
    EvaluationEleveModule,
    IndicateurModule,
    AnneeModule,
  },
});
