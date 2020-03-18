<template>
  <v-layout align-start>
    <v-flex>
        <v-alert type="error" v-model="flagError">
      {{textoError}}
    </v-alert>
      <v-expansion-panel v-if="panelActivo==='pnl01'">
        <v-data-table
          :headers="headers"
          :items="pacientes"
          sort-by="calories"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Listado Pacientes</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-text-field
                class="text-xs-center"
                v-model="search"
                append-icon="search"
                label="Busqueda"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn class="ma-2" tile outlined color="#56c8d8" @click="abrirPanelGestion()">
                <v-icon left>add_box</v-icon>Nuevo Paciente
              </v-btn>
              <!--  
           
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.nombre " label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
              </v-dialog>-->
              <v-dialog v-model="adModal" max-width="290">
                <v-card>
                  <v-card-title class="headline" v-if="adAccion==1">Eliminar Paciente</v-card-title>
                  <v-card-title class="headline" v-if="adAccion==2">¿Desactivar Item?</v-card-title>
                  <v-card-text>
                    Estás a punto de
                    <span v-if="adAccion==1">Eliminar</span>
                    <span v-if="adAccion==2">Desactivar</span>
                    el ítem {{ nombreCompleto }}
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" @click="activarDesactivarCerrar">Cancelar</v-btn>
                    <v-btn color="orange darken-4" @click="eliminarItem">Eliminar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)" title="Editar Paciente">editar</v-icon>
            <v-icon
              small
              class="mr-2"
              @click="abrirModalMensaje(item)"
              title="Eliminar Paciente"
            >delete</v-icon>
          </template>

          <template v-slot:no-data>
            <span>No exite registros...</span>
          </template>
          <template v-slot:item.activo="{ item }">
            <v-chip :color="getColor(item.activo)" label text-color="white">
              <span v-text="getTextActivo(item.activo)"></span>
            </v-chip>
          </template>
        </v-data-table>
      </v-expansion-panel>
      <v-expansion-panel v-if="panelActivo==='pnl02'">
        <br />
        <br />
        <v-container fill-height fluid grid-list-xl>
          <v-layout justify-center wrap>
            <v-flex xs12 md10>
              <v-form ref="formpacientes">
                <v-hover v-slot:default="{ hover }">
                  <v-card :elevation="hover ? 12 : 2" class="mx-auto">
                    <v-card :elevation="5" color="#26C6DA">
                      <br />
                      <h3 class="text-md-left">
                        <font color="#37474F">{{ formTitle }}</font>
                      </h3>
                      <br />
                    </v-card>

                    <v-container py-0>
                      <v-layout wrap>
                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="nombre"
                            class="purple-input"
                            label="Nombre (*)"
                            required
                            :rules="diagnostivoRules"
                          />
                        </v-flex>
                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="apePaterno"
                            class="purple-input"
                            label="Ape. Paterno  (*)"
                            required
                            :rules="diagnostivoRules"
                          />
                        </v-flex>
                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="apeMaterno"
                            label="Ape. Materno"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field
                            v-model="ci"
                            label="Cedula Identidad (*)"
                            class="purple-input"
                            required
                            :rules="diagnostivoRules"
                          />
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="fecNacimiento"
                                label="Fecha Nacimiento (*)"
                                persistent-hint
                                prepend-icon="event"
                                v-on="on"
                                required
                                :rules="diagnostivoRules"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="fecNacimiento" no-title @input="menu1 = false"></v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field v-model="direccion" label="Direccion" class="purple-input" />
                        </v-flex>

                        <v-flex xs12 md6>
                          <v-text-field v-model="ocupacion" class="purple-input" label="Ocupacion" />
                        </v-flex>

                        <v-flex xs12 md6>
                          <v-text-field
                            v-model="telefono"
                            label="Telefono"
                            class="purple-input"
                            type="number"
                          />
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field
                            v-model="celular"
                            label="Celular"
                            class="purple-input"
                            type="number"
                          />
                        </v-flex>

                        <v-flex xs12 md6>
                          <v-text-field
                            v-model="correo"
                            label="Corre Electronico"
                            class="purple-input"
                          />
                        </v-flex>

                        <v-flex xs12 md6>
                          <v-radio-group v-model="genero" col>
                            <template v-slot:label>
                              <div>
                                <strong>Genero</strong>
                              </div>
                            </template>
                            <v-radio label="Masculino" value="M"></v-radio>
                            <v-radio label="Femenino" value="F"></v-radio>
                          </v-radio-group>
                        </v-flex>

                        <v-flex xs12>
                          <v-textarea
                            v-model="antecedentesF"
                            class="purple-input"
                            label="Antecedentes familiares"
                          />
                        </v-flex>

                        <v-flex xs12 text-xs-left>
                          <v-btn
                            class="mx-0 font-weight-light"
                            title="Cancelar operacion"
                            color="primary"
                            text
                            @click="cerrarPanelGestion()"
                          >Cancelar</v-btn>
                          <v-btn
                            class="mx-0 font-weight-light"
                            title="Guardar cambios"
                            color="blue darken-1"
                            text
                            @click="guardar()"
                          >Registrar</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-hover>
              </v-form>
            </v-flex>
            <v-flex xs12 md4></v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel>
      <v-snackbar
        v-model="snackbar"
        :color="color"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
      >
      <v-icon>feedback</v-icon>
        {{ text }}
        <!--<v-btn dark text @click="snackbar = false">Close</v-btn>-->
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>
          

<script>
import axios from "axios";
import VeeValidate from "vee-validate";
export default {
  data() {
    return {
      menu1: "",
      pacientes: [],
      panelActivo: "pnl01",
      value: "name",
      codPaciente: "",
      nombre: "",
      apePaterno: "",
      apeMaterno: "",
      ci: "",
      telefono: "",
      celular: "",
      fecNacimiento: "",
      direccion: "",
      ocupacion: "",
      genero: "M",
      antecedentesF: "",
      correo: "",
      nombreCompleto: "",
    
      headers: [
        { text: "Opciones", value: "action", sortable: false },
        { text: "Nombre", value: "nombreCompleto" },
        { text: "Ced. Identidad", value: "ci" },
        { text: "Telefono", value: "telefono" },
        { text: "Celular", value: "celular" },
        { text: "Estado", value: "activo" }
      ],
      search: "",
      dialog: false,
      editedIndex: -1,
      adModal: 0,
      adAccion: 0,
      //validaciones
      diagnostivoRules: [v => !!v || "Es obligatorio ingresar este campo..."],
      //notificacione
      snackbar: false,
      x: "right",
      y: "top",
      timeout: 3000,
      text: "",
      color: "",
      textoSuccess:" Operacion realizada correctamente!!",
      colorSuccess:"#56c8d8",
      //errores
      flagError:false,
      textoError:'',
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "  Gestion Paciente"
        : "   Editar Paciente";
    }
  },

  created() {
    this.listar();
  },

  methods: {
    abrirPanelGestion() {
      this.panelActivo = "pnl02";
    },
    cerrarPanelGestion() {
      this.panelActivo = "pnl01";
      this.limpiar();
    },
    getTextActivo(valor) {
      if (valor === 0) return "Activo";
      else return "Inactivo";
    },
    getColor(valor) {
      if (valor === 0) return "#56c8d8";
      else if (valor !== 0) return "orange";
      else return "red";
    },
    notificaciones(operacion,texto) {
      //this.$vs.notify({title:'Operacion',text:'Operacion Realizado Exitosamente....',color:'#5b3ccf',position:'top-right'});
      
      this.snackbar = true;
      this.x = "right";
      this.y = "top";
      this.timeout = 3000;
      this.text = texto;
      this.color =operacion;
    },
    mostrarError(mensaje)
    {
this.flagError=true;
this.textoError=mensaje;
   },
    listar() {
      let me = this;
      axios
        .get("api/Pacientes/Listar")
        .then(function(response) {
          me.pacientes = response.data;
        })
        .catch(function(error) {
          me.mostrarError(error);
        });
    },
    limpiar() {
      this.codPaciente = "";
      this.nombre = "";
      this.apePaterno = "";
      this.apeMaterno = "";
      this.ci = "";
      this.telefono = "";
      this.celular = "";
      this.fecNacimiento = "";
      this.direccion = "";
      this.ocupacion = "";
      this.genero = "M";
      this.antecedentesF = "";
      this.correo = "";
      this.editedIndex = -1;
    },

    guardar() {
      if (this.validacionGeneralObligatorios() === true) {
        this.editedIndex > -1 ? this.modificarBD() : this.guardarBD();
      }
    },
    validacionGeneralObligatorios() {
      let estado = true;
      if (
        this.ci === "" ||
        this.nombre === "" ||
        this.apePaterno === "" ||
        this.fecNacimiento === ""
      ) {
        this.$refs.formpacientes.validate();
        estado = false;
      }
      return estado;
    },
    modificarBD() {
      let me = this;
      axios
        .put("api/Pacientes/actualizar", {
          codPaciente: me.codPaciente,
          nombre: me.nombre,
          apePaterno: me.apePaterno,
          apeMaterno: me.apeMaterno,
          direccion: me.direccion,
          ci: me.ci,
          sexo: me.genero,
          telefono: me.telefono,
          celular: me.celular,
          ocupacion: me.ocupacion,
          antFamiliares: me.antecedentesF,
          fecNacimiento: me.fecNacimiento,
          correo: me.correo
        })
        .then(function(response) {
          me.notificaciones(me.colorSuccess,me.textoSuccess);
          me.listar();
          me.limpiar();
          me.cerrarPanelGestion();
        })
        .catch(function(error) {
             me.mostrarError(error);
        });
    },
    guardarBD() {
      let me = this;
      axios
        .post("api/Pacientes/crear", {
          nombre: me.nombre,
          apePaterno: me.apePaterno,
          apeMaterno: me.apeMaterno,
          direccion: me.direccion,
          ci: me.ci,
          sexo: me.genero,
          telefono: me.telefono,
          celular: me.celular,
          ocupacion: me.ocupacion,
          antFamiliares: me.antecedentesF,
          fecNacimiento: me.fecNacimiento,
          correo: me.correo
        })
        .then(function(response) {
         me.notificaciones(me.colorSuccess,me.textoSuccess);
          me.listar();
          me.limpiar();
          me.cerrarPanelGestion();
        })
        .catch(function(error) {
             me.mostrarError(error);
        });
    },
    editItem(item) {
      this.codPaciente = item.codPaciente;
      this.nombre = item.nombre;
      this.apePaterno = item.apePaterno;
      this.apeMaterno = item.apeMaterno;
      this.ci = item.ci;
      this.telefono = item.telefono;
      this.celular = item.celular;
      this.fecNacimiento = item.fecNacimiento;
      this.direccion = item.direccion;
      this.ocupacion = item.ocupacion;
      this.genero = item.sexo;
      this.antecedentesF = item.antFamiliares;
      this.correo = item.correo;
      this.editedIndex = 1;
      this.abrirPanelGestion();
    },
    abrirModalMensaje(item) {
      this.adModal = 1;
      this.adAccion = 1;
      this.nombreCompleto = item.nombreCompleto;
      this.codPaciente = item.codPaciente;
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    eliminarItem() {
      let me = this;
      axios
        .put("api/Pacientes/desactivar/" + this.codPaciente, {})
        .then(function(response) {
          me.activarDesactivarCerrar();

          me.listar();
        })
        .catch(function(error) {
           me.mostrarError(error);
        });
    }
  }
};
</script>