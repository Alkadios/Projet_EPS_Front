<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1">
        </div>
        <div class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2"> Personnalisation de l'équipe EPS <br/> au </p>
              <h4 class="text-dark mb-4"> {{NomEtablissement}} </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3"><button class="btn btn-primary btn-sm">Ajouter une APSA</button></div>
      <div id="mesCA">
      <div class="row">
        <div class="col-sm"  v-for="monCA in CA" :key="monCA.nom">
          <table style="width:100%">
            <tr>
              <th :style="'background-color: ' + monCA.couleur">{{monCA.nom}} </th>
              <a id="AjoutAPSAinCA" href="#"><i class="fa fa-plus"></i></a>
            </tr>
            <tr v-for="monAPSA in monCA.APSA" :key="monAPSA.nom">
              <td> <a>{{ monAPSA.nom}}</a> </td>
            </tr>
          </table>
          <br/>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const NomEtablissement = "Lycée Professionnel de St Joseph";
const CA = [{nom: "CA1", APSA: [{nom: "Demi-fond"}, {nom: "Saut en hauteur"}], couleur: "red"}, {nom: "CA2", APSA: [{nom: "Natation"}, {nom: "Step"}], couleur: "orange"}, {nom: "CA1", APSA: [{nom: "Demi-fond"}, {nom: "Saut en hauteur"}], couleur: "red"}, {nom: "CA1", APSA: [{nom: "Demi-fond"}, {nom: "Saut en hauteur"}], couleur: "red"}, {nom: "CA1", APSA: [{nom: "Demi-fond"}, {nom: "Saut en hauteur"}], couleur: "red"}]

</script>

<style>
#AjoutAPSAinCA{
  color:white;
  position: relative;
  right: 20px;
  top: 4px;
}

th {
  color: white;
  padding-left: 5px;
  height: 30px;
  border-radius: 3px;
}

#mesCA{
  margin-left: 25px;
  margin-right: 25px;
  bottom: 35px;
  position: relative;
}

.mb-3 {
  margin-left: 25px;
  margin-right: 25px;
  bottom: 35px;
  position: relative;
}
</style>
