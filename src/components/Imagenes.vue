<template>
  <v-container> 
    

    <v-progress-linear indeterminate color="cyan" v-if="loading"></v-progress-linear>

    <v-row v-bind:class="imagenes" v-else-if="imagesCollection.length >= 1">
      <v-card elevation="24"  max-width="320" class="mx-auto" v-on:mouseover="cycle=true" v-on:mouseleave="get">
        <v-system-bar lights-out></v-system-bar>
          <v-carousel :show-arrows="arrow" :cycle="cycle" interval="2000" hide-delimiters  hide-delimiter-background delimiter-icon="mdi-minus" height="300">
            <v-carousel-item  ref="juan" v-for="(imagen, i) in imagesCollection" :key="i" v-on:mouseleave="i=0" >
              <v-card light class="mx-auto text-left" max-width="500" >            
                <v-img class="white--text" height="250px" :src="imagen.url">
                  <v-card-title class="align-end fill-height">{{imagen.nombre}}</v-card-title>
                </v-img>
                <v-card-text>{{imagen.descripcion}}</v-card-text>
              </v-card>
            </v-carousel-item>
          </v-carousel>
      </v-card> 
    </v-row>

    <v-row v-else align="center" justify="center">
      <v-alert type="info">
        No hay datos, Agregue una imagen.
      </v-alert>
    </v-row>

      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-file-input type="file" v-on:change="agregarImagen" label="File input" ref="img"></v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field label="Nombre" v-on:change="validate"  ref="nombre" block outlined v-model="img.nombre"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Descripción" v-on:change="validate" ref="descripcion" block outlined v-model="img.descripcion"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col  cols="12" >
          <v-btn class="ma-2" block tile color="indigo" dark v-on:click="agregar" :disabled="disabledBtn">Agregar imagen</v-btn>
        </v-col>
      </v-row>
    
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data(){
    return {
      i: 1,
      arrow: false,
      cycle: false,
      loadingCyrcle: 'd-none',
      loading: false,
      imagenes: '',
      disabledBtn: true,
      imagesCollection: [],
      img: {
        url: '',
        nombre: '',
        descripcion: ''
      },
      image: '',
      uploadValue: 0,
      picture: ''
    }
  },
  methods:{
    validate()
    {
      if(this.img.nombre.length > 0)
      {
        this.disabledBtn = false;
      }
      else if(this.img.descripcion.length > 0)
      {
        this.disabledBtn = false;
      }
      else 
      {
        this.disabledBtn = true;
      }
    },
    get()
    {
      this.cycle = false;
      this.loading = true
      this.loadingCyrcle = '';
      this.imagenes = 'd-none';

      const db = this.$firebase.firestore();
        db
          .collection('images')
          .get()
          .then(snap => {
            const imagesCollection = [];
            snap.forEach(doc => {
              imagesCollection.push(doc.data());
            });
            this.imagesCollection = imagesCollection;
            // console.log(this.imagesCollection);
            this.loadingCyrcle = 'd-none';
            this.loading = false;
            this.imagenes = ''
          });
    },
    preGet()
    {
      // console.log("preGet");
      
      
      this.get();
    },
    agregar()
    {
      this.disabledBtn = true;
      const db = this.$firebase.firestore();
      db.collection("images").add({
            url: this.img.url,
            nombre: this.img.nombre,
            descripcion: this.img.descripcion
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

        this.$refs.nombre.reset();
        this.$refs.descripcion.reset();
        this.$refs.img.reset();
        this.get();
    },
    // imagen(event)
    // {
      
    // },
    agregarImagen(event)
    {
      if(this.$refs.nombre == null)
      {
        console.log("Falta llenar campo nombre")
        return
      }
      console.log(event.name)
      this.image = event; 
      const refStorage = firebase.storage().ref('imagenes/'+ event.name)
      const task = refStorage.put(this.image);

      task.on('state_changed', snapshot => {
        const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        this.uploadValue = porcentaje;
      }, error => {
         console.log(error.message)
      }, () => {this.uploadValue = 100;
            task.snapshot.ref.getDownloadURL().then((url)=> {
              this.img.url = url;
               console.log(this.img.url)
            })
          })
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style>

</style>
