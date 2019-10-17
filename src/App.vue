<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Juan Cepeda</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Firebase</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Imagenes/>
    </v-content>
  </v-app>
</template>

<script>
import Imagenes from './components/Imagenes';

export default {
  name: 'App',
  components: {
    Imagenes,
  },
  data: () => ({
    //
  }),
};
</script>
