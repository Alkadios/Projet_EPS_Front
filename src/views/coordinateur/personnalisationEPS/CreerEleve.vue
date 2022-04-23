 <template>

  <div class="row mb-3">
    <div class="col-lg-4">
      
    </div>
    <div class="col-lg-12 col-md-12">
      <div class="row mb-3 d-none">
        <div class="col">
          <div class="card textwhite bg-primary text-white shadow">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col">
                  <p class="m-0">Peformance</p>
                  <p class="m-0"><strong>65.2%</strong></p>
                </div>
                <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
              </div>
              <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card textwhite bg-success text-white shadow">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col">
                  <p class="m-0">Peformance</p>
                  <p class="m-0"><strong>65.2%</strong></p>
                </div>
                <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
              </div>
              <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <p class="text-primary m-0 fw-bold">Creer un Eleve</p>
            </div>
            <div class="card-body">
              <form @submit.prevent="onSubmitUtil">
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Nom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input class="form-control" v-model="nouveauEleve.nom" type="nom" id="nom" name="nom" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Prenom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.prenom"
                        type="prenom"
                        id="prenom"
                        name="prenom"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="telephone"><strong>telephone</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.telephone"
                        type="telephone"
                        id="telephone"
                        name="telephone"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="email"><strong>Email</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauUtilisateur.email"
                        type="email"
                        id="email"
                        name="email"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="mailParent1"><strong>mailParent1</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.mailParent1"
                        type="mailParent1"
                        id="mailParent1"
                        name="mailParent1"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="mailParent2"><strong>mailParent2</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.mailParent2"
                        type="mailParent2"
                        id="mailParent2"
                        name="mailParent2"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="sexeEleve"><strong>sexeEleve</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input type="radio" id="M" value="M"  name="sexeEleve" v-model="nouveauEleve.sexeEleve">
                        <label for="M">M</label>
                        <br>
                        <input  type="radio" id="F" value="F"  name="sexeEleve" v-model="nouveauEleve.sexeEleve">
                        <label for="F">F</label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="password"><strong>Mot de passe</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauUtilisateur.password"
                        type="password"
                        id="password"
                        name="password"
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-3" style="text-align: center">
                  <button class="btn btn-primary btn-sm" type="submit">Créer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Eleve, User, Utilisateur } from '@/models';
import EleveService from '@/services/EleveService';
import UserService from '@/services/UserService';
import user from '@/store/modules/user';
import { ref, onMounted } from 'vue';

const categories = ref([
  { name: 'Accounting', key: 'A' },
  { name: 'Marketing', key: 'M' },
  { name: 'Production', key: 'P' },
  { name: 'Research', key: 'R' },
]);

const selectedCategories = ref([]);
const { saveEleve } = EleveService();
const { saveUser } = UserService();

const NomEleve = 'Laura GUICHON';

const nouveauUtilisateur= ref<User>({
  email: '',
  roles: ["Eleve"],
  password: '',
});



const nouveauEleve = ref<Eleve>({
  id: '',
  nom: '',
  prenom: '',
  telephone: '',
  mailParent1: '',
  mailParent2: '',
  sexeEleve: '',
  user: '',
  etablissement: 1,
});


function CreerEleve() {
  saveEleve(
    nouveauUtilisateur.value.email,
    nouveauUtilisateur.value.roles,
    nouveauUtilisateur.value.password,
    nouveauEleve.value.nom,
    nouveauEleve.value.prenom,
    nouveauEleve.value.telephone,
    nouveauEleve.value.mailParent1,
    nouveauEleve.value.mailParent2,
    nouveauEleve.value.sexeEleve,
    nouveauEleve.value.etablissement
  );

}

function verif() {
  console.log(selectedCategories.value);
}

function onSubmitUtil() {
  CreerEleve();
}
</script>
<style>
.mb-3 {
  margin-left: unset;
  margin-right: unset;
  bottom: unset;
  position: relative;
}

label {
  top: 0.3rem;
  position: absolute;
}
</style>
