<template>
  <v-app id="app">
    <v-navigation-drawer     
     fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
     
      v-model="drawer" class="menu">
      <v-list dense>
        <template>
          <v-list-item :to="{name:'home'}">
            <v-list-item-action @click="abrirRoute()">
              <v-icon color="#0097a7">home</v-icon>
            </v-list-item-action>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
        </template>
         <template>
          <v-list-group>
             <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Pacientes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{name:'pacientes'}">
          <v-list-item-action>
              <v-icon color="#0097a7">table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Gestion Pacientes
              </v-list-item-title>
            </v-list-item-content>
         </v-list-item>
   <v-list-item :to="{name:'historial'}">
          <v-list-item-action>
              <v-icon color="#0097a7">table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Historial  clinico
              </v-list-item-title>
            </v-list-item-content>
         </v-list-item>
     <v-list-item :to="{name:''}">
          <v-list-item-action>
              <v-icon color="#0097a7">table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Gestion Cobros
              </v-list-item-title>
            </v-list-item-content>
         </v-list-item>
       

            </v-list-group>
        </template>
   
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="#0097a7" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Consultorio Alba</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon large color="purple darken-2">dialpad</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon large color="teal darken-2">email</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-footer dark height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center >
          <v-card flat tile color="colorPlantilla" class="white--text">
            <v-card-text   class="white--text pt-0">Inturias System &copy;2020</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
<style scoped>
 .menu{
background: url(assets/icono.jpeg);
 width: 100%;
  height: auto;
  }
</style>
