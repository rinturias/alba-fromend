<template>
  <v-layout align-start>
    <v-flex>
      <div v-if="panelActivo==='pnl01'">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-toolbar-title>
                  <h3>Buscar Paciente</h3>
                </v-toolbar-title>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-combobox v-model="select" :items="items" label="Select un parametro de busqueda"></v-combobox>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  class="text-xs-center"
                  v-model="valorBusqueda"
                  label="Ingrese el valor de busqueda"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2">
                <v-btn class="ma-2" tile outlined color="#56c8d8" @click="buscarPaciente()">
                  <v-icon left>search</v-icon>Buscar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="pacientes"
          sort-by="calories"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-icon
              color="#56c8d8"
              class="mr-1"
              @click="NuevaConsulta(item)"
              title="Nueva consulta"
            >add_circle</v-icon>
           
            <v-icon  v-if="item.countConsultas !==0"
              color="orange"
              class="mr-1"
              v-on:click="listadoCitasMedicas(item)"
              title="Consultas Abiertas"
            >remove_red_eye</v-icon>
          </template>
          <template v-slot:no-data>
            <span>No exite registros...</span>
          </template>
        </v-data-table>
      </div>
      <div v-if="panelActivo==='pnl02'">

           <v-form ref="formhistorial">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="12" md="3">
                <v-subheader>
                  <h2>
                    <strong>Motivo de la consulta(*):</strong>
                  </h2>
                </v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-textarea
                  v-model="motivoConsulta"
                  class="purple-input"
                  append-icon="comment"
                  rows="2"
                  label="Ingrese el motivo"
                    required
                    :rules="msjElementosObligatorios"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <br />
        <v-card>
          <v-card-title>
            <strong class="headline">Datos Generales</strong>
          </v-card-title>
          <v-container fluid>
            <h3>Patologia Actual</h3>
            <hr />
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Está usted bajo Tx. Médico?</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="2" name="encuesta" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Toma algún Medicamento?</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="3" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Le han practicado alguna intervención Quirúrgica?</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="4" name="encuesta" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>Ha presentado reacción alérgica a algún medicamento</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="5" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Sufre de Hipertensión Arterial?</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="6" name="encuesta" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Sangra excesivamente al cortarse?</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="7" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Padece o ha padecido algún problema sanguíneo?</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="8" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Está usted enbarazada?</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="9" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Sufre o ha sufrido alguna enfermedad? como: enf. Venéreas, problemas del corazón, Hepatitis Fiebre Reumática,Asma Diabetes,Ulceras gástrica,etc.</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="10" name="encuesta" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>¿Sufre de algún hábito parafuncional? Como morderse las uñas o labios, objetos o rechinarse los dientes, etc.</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="11" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <br />
        <v-card>
          <v-container fluid>
            <br />
            <h3>Examen Clinico Bucal</h3>
            <hr />
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Carrillos</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="13" v-model="p02" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>Mucosa</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="14" prefix="R:"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Encla</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="15" prefix="R:"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Lengua</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="16" prefix="R:"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Paladar</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="17" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <br />
        <v-card>
          <v-container fluid>
            <br />
            <h3>Exámenes Complementarios</h3>
            <hr />
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Rx Panorámica</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="19" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>Rx Periapical</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="20" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Otros</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field id="21" name="encuesta" prefix="R:"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Laboratorio</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="22" prefix="R:"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <br />
        <v-card>
          <v-container fluid>
            <br />
            <h3>Signos Vitales</h3>
            <hr />
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Temperatura Corporal</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="24" prefix="R:"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="2">
                <v-subheader>Frecuencia Respiratoria</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="25" prefix="R:"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader>Presión Arterial</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field name="encuesta" id="26" prefix="R:"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <br />
        <v-card>
          <v-btn class="ma-2" tile outlined color="#56c8d8" @click="guardarHistorial()">
            <v-icon left>add_box</v-icon>Guardar Historial
          </v-btn>

          <v-btn class="ma-2" tile outlined color="red" @click="cancelarEncuesta()">
            <v-icon left>add_box</v-icon>Cancelar
          </v-btn>
        </v-card>
         </v-form>
      </div>
      <div v-if="panelActivo==='pnl03'">
        <v-data-table
          :headers="headersHistorial"
          :items="historialPaciente"
          sort-by="calories"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Listado Historial Paciente</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-text-field
                class="text-xs-center"
                v-model="search"
                append-icon="search"
                label="Busqueda"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon
            
              color="black"
              class="mr-1"
              title="Plan de tratamiento"
              @click="listadoPlanTratamiento(item)"
            >event_note</v-icon>


           <!-- <v-icon color="#607d8b" class="mr-1" title="Secuencia del tratamiento">filter_frames</v-icon>

            <v-icon
              color="orange"
              class="mr-1"
              @click="ConsultasAbiertas(item)"
              title="Editar consulta"
            >create</v-icon>-->
          </template>
          <template v-slot:no-data>
            <span>No exite registros...</span>
          </template>
          <template v-slot:item.estado="{ item }">
            <v-chip :color="getColor(item.activo)" label text-color="white">
              <span v-text="getTextActivo(item.activo)"></span>
            </v-chip>
          </template>
        </v-data-table>
                <v-card>
          <br />
          <v-flex xs12 text-xs-left>
        
            <v-btn
              class="mx-0 font-weight-light"
              title="Cancelar operacion"
              color="primary"
              text
              @click="cancelarListadoPaciente()"
            >Cancelar</v-btn>
          </v-flex>
        </v-card>
      </div>
      <div v-if="panelActivo==='pnl04'">
        <v-form ref="formdiagnostico">
        <v-card color="#ffffff">
          <h2 style="text-align: center;">Diagnostico</h2>

          <v-row>
            <v-col cols="12" sm="12" md="2">
              <v-subheader style="color:#0097a7">Diagnostico del paciente(*):</v-subheader>
            </v-col>
            <v-col cols="12" sm="12" md="9">
              <v-textarea
                name="plan"
                label="Diagnostico"
                  required
                    :rules="msjElementosObligatorios"
                append-icon="comment"
                rows="4"
                v-model="diagnostico"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card>
     </v-form>
        <v-form ref="form">
          <v-card>
            <h3 class="ma-4">Plan de tratamiento</h3>
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-subheader style="color:#0097a7">Descripcion del plan</v-subheader>
              </v-col>
              <v-col cols="12" sm="12" md="5">
                <v-textarea
                  name="plan"
                  label="Tratamiento"
                  :rules="nameRules"
                  required
                  v-model="descripcionPlan"
                  append-icon="comment"
                  rows="4"
                ></v-textarea>
              </v-col>

              <v-col cols="12" sm="12" md="4">
                <v-btn
                  class="ma-2"
                  tile
                  outlined
                  color="#0097a7"
                  @click="AgregarDetallePlanTratamiento()"
                >
                  <v-icon left>library_add</v-icon>Add Plan
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-card color="red">
            <v-flex>
              <v-simple-table
                fixed-header
                height="auto"
                style="cursor: pointer !import;"
                class="table table-bordered table-hover elevation-10"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        <strong>Orden</strong>
                      </th>
                      <th class="text-left">
                        <strong>Descripcion</strong>
                      </th>
                      <th class="text-left">
                        <strong>Cantidad</strong>
                      </th>
                      <th class="text-left">
                        <strong>Opciones</strong>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="itemP in detallePlanT" :key="itemP.plan">
                      <td>
                        <template>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              label="Nro Orden"
                              :id="itemP.codigoPlan+''"
                              filled
                              placeholder="Ingrese #"
                              :value="itemP.orden"
                              name="ordenName"
                              @change="actualizarDetallePlanTVector(itemP)"
                            ></v-text-field>
                          </v-col>
                        </template>
                      </td>

                      <td>
                        <template>
                          <v-textarea
                            :value="itemP.planT "
                            @change="actualizarDetallePlanTVector(itemP)"
                            name="planTName"
                            append-icon="comment"
                            rows="3"
                          ></v-textarea>
                        </template>
                      </td>
                      <td>
                        <template>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              label="Cantidad"
                              name="cantidadName"
                              @change="actualizarDetallePlanTVector(itemP)"
                              :value="itemP.cantidad+''"
                              placeholder="Ingrese Cantidad"
                              filled
                            ></v-text-field>
                          </v-col>
                        </template>
                      </td>
                      <td>
                        <v-btn class="ma-2" color="#0097a7" @click="eliminarDetallePlan(itemP)">X</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-flex>
          </v-card>
        </v-form>
        <v-card>
          <v-flex>
            <v-form ref="formST">
              <h3 class="ma-4">Secuencia de tratamiento</h3>

              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <v-btn
                    class="ma-4"
                    tile
                    outlined
                    color="#0097a7"
                    @click="cargarSecuenciaTratamiento()"
                  >
                    <v-icon left>library_add</v-icon>Add Secuencia Tratamiento
                  </v-btn>
                </v-col>
              </v-row>
              <v-simple-table
                fixed-header
                height="auto"
                style="cursor: pointer !import;"
                class="table table-bordered table-hover elevation-10"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        <strong>Fecha</strong>
                      </th>
                      <th class="text-left">
                        <strong>Desc Tratamiento</strong>
                      </th>
                      <th class="text-left">
                        <strong>Monto</strong>
                      </th>
                      <th class="text-left">
                        <strong>Saldo cobrado</strong>
                      </th>
                      <th class="text-left">
                        <strong>Saldo faltante</strong>
                      </th>
                      <th>Opciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="itemST in CrearSecuenciaTratamientoList" :key="itemST.codigoVueST">
                      <td>
                        <template>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              :id="itemST.codigoVueST+''"
                              :value="itemST.fecha"
                              name="fechaST"
                              type="date"
                              prepend-icon="event"
                            ></v-text-field>
                          </v-col>
                        </template>
                      </td>

                      <td>
                        <template>
                          <v-textarea
                            name="descripcionST"
                            append-icon="comment"
                            rows="3"
                            @change="calcularSaldoFaltante(itemST)"
                            :value="itemST.descripcion"
                          >{{itemST.descripcion}}</v-textarea>
                        </template>
                      </td>
                      <td>
                        <template>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              :id="'monto'+itemST.codigoVueST"
                              label="Monto"
                              name="monto"
                              type="number"
                              :value="[comodinMonto ==0? itemST.monto:itemST.saldoFaltante]"
                              placeholder="Ingrese Cantidad"
                              @change="calcularSaldoFaltante(itemST)"
                              filled
                            ></v-text-field>
                          </v-col>
                        </template>
                      </td>
                      <td>
                        <v-text-field
                          :id="'saldoCobrado'+itemST.codigoVueST+''"
                          label="Sal Cobrado"
                          name="saldoCobrado"
                          type="number"
                          :value="itemST.saldoCobrado"
                          placeholder="Ingrese Cantidad"
                          @change="calcularSaldoFaltante(itemST)"
                          filled
                        ></v-text-field>
                      </td>
                      <td>
                        <label :id="'saldoFaltante'+itemST.codigoVueST+''" name="saldoFaltante">
                          {{itemST.saldoFaltante}}
                          <strong style="color:#0097a7">Bs.</strong>
                        </label>
                      </td>
                      <td>
                        <div v-if="itemST.codigoSecuenciaTsistema ===0">
                        <v-btn
                          class="ma-2"
                          color="#0097a7"
                          @click="eliminarDetalleSecuencia(itemST)"
                        >X</v-btn>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row"></th>
                      <td></td>
                      <td>
                        <strong>T. Monto</strong>
                        {{totalMonto}}
                        <strong style="color:#0097a7">Bs.</strong>
                      </td>
                      <td>
                        <strong>T. Saldo C.</strong>
                        {{totalSCobrado}}
                        <strong style="color:#0097a7">Bs.</strong>
                      </td>
                      <td>
                        <strong>T. Saldo F.</strong>
                        {{totalSFaltante}}
                        <strong style="color:#0097a7">Bs.</strong>
                      </td>
                    </tr>
                  </tfoot>
                </template>
              </v-simple-table>
            </v-form>
          </v-flex>
        </v-card>
        <v-card>
          <br />
          <v-flex xs12 text-xs-left>
            <v-btn
              class="mx-0 font-weight-light"
              title="Guardar cambios"
              color="#0097a7"
              text
              @click="validacionCamposObligatoriosGuardarDiagnosticoDetalle()"
            >Registrar</v-btn>
            <v-btn
              class="mx-0 font-weight-light"
              title="Cancelar operacion"
              color="primary"
              text
              @click="cerrarPanel04()"
            >Cancelar</v-btn>
          </v-flex>
        </v-card>
      </div>
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
export default {
  data() {
    return {
      p02: "",
      select: "Ci",
      items: ["Ci", "Nombre"],
      valorBusqueda: "",
      menu1: "",
      pacientes: [],
      respuestaH: [],
      historialPaciente: [],
      motivoConsulta: "",
      panelActivo: "pnl01",
      value: "name",
      codPaciente: 0,
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
        { text: "Correo", value: "correo" }
      ],
      headersHistorial: [
        { text: "Opciones", value: "action", sortable: false },
        { text: "Tipo Consulta", value: "motivo" },
        { text: "fecha consulta", value: "fecConsulta" },
        { text: "Nombre", value: "nombreCompleto" },
        { text: "Estado consulta", value: "estado" }
      ],
      search: "",
      dialog: false,
      editedIndex: -1,
      adModal: 0,
      adAccion: 0,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159
        }
      ],
      //plan
      detallePlanT: [],
      incrementPlan: 0,
      descripcionPlan: "",

      nameRules: [
        v =>
          !!v ||
          "Es obligatorio ingresar una descripcion de plan de tratamiento"
      ],
      diagnostivoRules: [
        v => !!v || "Es obligatorio ingresar una descripcion del diagnostico"
      ],
       msjElementosObligatorios: [v => !!v || "Es obligatorio ingresar este campo..."],
      secuencia: [],

      CrearSecuenciaTratamientoList: [],
      codigoSecIncrement: 0,

      totalMonto: 0,
      totalSCobrado: 0,
      totalSFaltante: 0,
      descipcioPrueba: "",
      codConsulta: 0,
      codDiagnostico:0,
      diagnostico: "",
      //SECUENCIA TRATAMIENTO
      fechaST: "",
      descripcionST: "",
      montoST: 0,
      saldoCST: 0,
      saldoFST: 0,
      piesaDSt: 0,
      comodinMonto: 0,
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
      textoError:''
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "  Nuevo Paciente"
        : "   Editar Paciente";
    }
  },

  created() {
    this.listar();
   
  },

  methods: {
    buscarPaciente() {
      let me = this;
      axios
        .get(
          "api/Pacientes/buscarPaciente/" + me.select + "/" + me.valorBusqueda
        )
        .then(function(response) {
          me.pacientes = [];
          me.pacientes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listar() {
      let me = this;
      axios
        .get("api/Pacientes/ListarConsultas")
        .then(function(response) {
          me.pacientes=[];
          me.pacientes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTextActivo(valor) {
      if (valor === "A") return "cerrado";
      else return "Abierto";
    },
    getColor(valor) {
      if (valor === 0) return "#56c8d8";
      else if (valor !== 0) return "orange";
      else return "red";
    },
   notificaciones(operacion,texto) {
    
      
      this.snackbar = true;
      this.x = "right";
      this.y = "top";
      this.timeout = 3000;
      this.text = texto;
      this.color =operacion;
    },
    NuevaConsulta(item) {
      this.panelActivo = "pnl02";
      this.codPaciente = item.codPaciente;
      this.listarNuevoDetalleRespuestas();
    },
    listadoCitasMedicas(item) {
      this.pacientes=[];
      this.panelActivo = "pnl03";
      this.codPaciente = item.codPaciente;
      this.listarHistorialPaciente();
    },
    listadoPlanTratamiento(item) {
      this.panelActivo = "pnl04";
      this.codConsulta = item.codConsulta;
       this.listarDetalleDiagnostico();
    },
    getDetalleRespuestas() {
      this.respuestaH = [];
      var leng = document.getElementsByName("encuesta");
      for (let index = 0; index < leng.length; index++) {
        this.respuestaH.push({
          codPrimaria: document.getElementsByName("encuesta")[index].id,
          respuesta: document.getElementsByName("encuesta")[index].value
        });
      }

      console.log(this.respuestaH);
    },

   

  guardarHistorial() {
      if (this.validacionGeneralObligatoriosHistorial() === true) {
       this.guardarDetalleRespuestas();
      }
    },
  validacionGeneralObligatoriosHistorial() {
      let estado = true;
      if (
        this.motivoConsulta === "" 
        ) {
        this.$refs.formhistorial.validate();
        estado = false;
        }
      return estado;
    },
    guardarDetalleRespuestas() {
      let me = this;
      me.getDetalleRespuestas();
      axios
        .post("api/Consulta/crear", {
          motivo: this.motivoConsulta,
          codPaciente: this.codPaciente,
          RespuestaHistorial: me.respuestaH
        })
        .then(function(response) {
               me.notificaciones(me.colorSuccess,me.textoSuccess);
               me.cancelarEncuesta();
               me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listarNuevoDetalleRespuestas() {
      let me = this;
      var parametro = "";
      parametro = me.codPaciente;
      axios
        .get("api/Consulta/mostrarRespuestaHistorial/" + parametro)
        .then(function(response) {
          me.graficarDetalleMaestroRespuesta(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    graficarDetalleMaestroRespuesta(data) {
      for (let index = 0; index < data.length; index++) {
        document.getElementById(data[index].codPrimaria + "").value =
          "" + data[index].respuesta;
      }
    },
    listarHistorialPaciente() {
      let me = this;
      var parametro = "";
      parametro = me.codPaciente;
      axios
        .get("api/Consulta/MostrarHistorialPaciente/" + parametro)
        .then(function(response) {
          me.historialPaciente=[];
          me.historialPaciente = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cancelarEncuesta() {
      this.panelActivo = "pnl01";
    },
    cancelarListadoPaciente(){
      this.listar();
      this.panelActivo = "pnl01";

    },
    AgregarDetallePlanTratamiento() {
      //METODO DE CARGA PLAN TRATAMIENTO
      if (this.descripcionPlan === "" || this.descripcionPlan === undefined) {
        this.$refs.form.validate();
      } else {
        this.incrementPlan = this.incrementPlan + 1;
        this.detallePlanT.push({
          codigoPlan: this.incrementPlan,
          codigoPlanTSistema: 0,
          orden: this.incrementPlan,
          planT: this.descripcionPlan,
          cantidad: 0
        });

        this.descripcionPlan = "";
        this.ordenarDeMayorMenorPlanT();
      }
    },

    ordenarDeMayorMenorPlanT() {
      this.detallePlanT.sort(function(a, b) {
        return b.codigoPlan - a.codigoPlan;
      });
    },
    actualizarDetallePlanTVector(o) {
      for (var i = 0; i < this.detallePlanT.length; i++) {
        if (this.detallePlanT[i].codigoPlan == o.codigoPlan) {
          this.detallePlanT[i].orden = document.getElementsByName("ordenName")[
            i
          ].value;
          this.detallePlanT[i].planT = document.getElementsByName("planTName")[
            i
          ].value;
          this.detallePlanT[i].cantidad = document.getElementsByName(
            "cantidadName"
          )[i].value;
        }
      }
    },

    eliminarDetallePlan(item) {
      var pocicion = this.detallePlanT.indexOf(2, 1);
      this.detallePlanT.splice(this.myIndexOf(item), 1);
    },
    myIndexOf(o) {
      for (var i = 0; i < this.detallePlanT.length; i++) {
        if (this.detallePlanT[i].codigoPlan == o.codigoPlan) {
          return i;
        }
      }
      return -1;
    },
    submit() {
      this.$refs.form.validate();
    },
    cerrarPanel04() {
      this.totalMonto= 0;
     this.totalSCobrado=0;
     this.totalSFaltante= 0;
    this.RespuestaHistorial=[];
     this.detallePlanT=[];
     this.CrearSecuenciaTratamientoList=[];
     this.diagnostico="";

      this.panelActivo = "pnl03";
    },

    //eliminar detalla de secuencia
    eliminarDetalleSecuencia(item) {
      var pocicion = this.CrearSecuenciaTratamientoList.indexOf(2, 1);
      this.CrearSecuenciaTratamientoList.splice(
        this.myIndexOfSecuencia(item), 1 );
      this.calcularSaldoFaltanteTotales();
    },
    myIndexOfSecuencia(o) {
      for (var i = 0; i < this.CrearSecuenciaTratamientoList.length; i++) {
        if (
          this.CrearSecuenciaTratamientoList[i].codigoVueST == o.codigoVueST
        ) {
          return i;
        }
      }
      return -1;
    },
    cargarSecuenciaTratamiento() {
      let newMontoLeng = 0;
      let newSaldoCobrado=0;
      this.CrearSecuenciaTratamientoList.forEach(ele => {
      newMontoLeng = this.traerUltimoMonto(ele);
      newSaldoCobrado=this.traerUltimoSaldoCobrado(ele);
      });
      ///////////////////**************/***** */ */
      this.codigoSecIncrement = this.codigoSecIncrement + 1;
      this.CrearSecuenciaTratamientoList.push({
        codigoSecuenciaTsistema:0,
        codigoVueST: this.codigoSecIncrement,
        fecha: this.fechaST,
        descripcion: this.descripcionST,
        monto: parseFloat(newMontoLeng - newSaldoCobrado).toFixed(2),
        saldoCobrado: this.saldoCST,
        saldoFaltante: this.saldoFST
      });
      console.log(this.montoST - this.saldoCST);
      this.montoST = 0;
      this.saldoCST = 0;
      this.saldoFST = 0;
      //cambiando de value
      //  this.comodinMonto=1;
    },
    traerUltimoMonto(o) {
      let tamaño = this.CrearSecuenciaTratamientoList.length;
      let monto = 0;
      for (let i = 0; i <this.CrearSecuenciaTratamientoList.length; i++) {
        if ((i = tamaño)) {
          monto = o.monto;
          return monto;
        }
      }
    },
        traerUltimoSaldoCobrado(o) {
      let tamaño = this.CrearSecuenciaTratamientoList.length;
      let saldoCobrado = 0;
      for (let i = 0; i <this.CrearSecuenciaTratamientoList.length; i++) {
        if ((i = tamaño)) {
          saldoCobrado = o.saldoCobrado;
          return saldoCobrado;
        }
      }
    },
    carcularCargaSaldoFaltante(o) {
      for (var i = 0; i < this.CrearSecuenciaTratamientoList.length; i++) {
        if (
          this.CrearSecuenciaTratamientoList[i].codigoVueST == o.codigoVueST
        ) {
          this.CrearSecuenciaTratamientoList[i].saldoFaltante =
            this.CrearSecuenciaTratamientoList[i].monto -
            this.CrearSecuenciaTratamientoList[i].saldoCobrado;
        }
      }
      this.calcularSaldoFaltanteTotales();
    },
    calcularSaldoFaltante(o) {
      for (var i = 0; i < this.CrearSecuenciaTratamientoList.length; i++) {
        if (
          this.CrearSecuenciaTratamientoList[i].codigoVueST == o.codigoVueST
        ) {
          this.CrearSecuenciaTratamientoList[
            i
          ].fecha = document.getElementsByName("fechaST")[i].value;
          this.CrearSecuenciaTratamientoList[
            i
          ].descripcion = document.getElementsByName("descripcionST")[i].value;
          this.CrearSecuenciaTratamientoList[
            i
          ].monto = document.getElementsByName("monto")[i].value;
          this.CrearSecuenciaTratamientoList[
            i
          ].saldoCobrado = document.getElementsByName("saldoCobrado")[i].value;
          this.CrearSecuenciaTratamientoList[i].saldoFaltante =
            this.CrearSecuenciaTratamientoList[i].monto -
            this.CrearSecuenciaTratamientoList[i].saldoCobrado;
        }
      }
      this.calcularSaldoFaltanteTotales();
    },
    calcularSaldoFaltanteTotales() {
      let acuTMonto = 0;
      let acuTSCobrado = 0;
      let acuTSFaltante = 0;
      for (var i = 0; i < this.CrearSecuenciaTratamientoList.length; i++) {
        acuTMonto =
          parseFloat(acuTMonto) +
          parseFloat(this.CrearSecuenciaTratamientoList[i].monto);
        acuTSCobrado =
          parseFloat(acuTSCobrado) +
          parseFloat(this.CrearSecuenciaTratamientoList[i].saldoCobrado);
        acuTSFaltante =
          parseFloat(acuTSFaltante) +
          parseFloat(this.CrearSecuenciaTratamientoList[i].saldoFaltante);
      }
      this.totalMonto = acuTMonto;
      this.totalSCobrado = acuTSCobrado;
      this.totalSFaltante = acuTSFaltante;
    },

    validacionGeneralObligatorios() {
      if (this.descipcioPrueba === "" || this.descipcioPrueba === undefined) {
        this.$refs.formST.validate();
      }
    },
    validacionCamposObligatoriosGuardarDiagnosticoDetalle(){
if  (this.diagnostico===""){ this.$refs.formdiagnostico.validate();}else{this.guardarDiagnosticoDetalle();}
    },

    guardarDiagnosticoDetalle() {
      let me = this;
      axios.post("api/Diagnosticos/crear", {
        codDiagnostico:me.codDiagnostico,
          diagnostico: me.diagnostico,
          codConsulta: me.codConsulta,
          CrearPlanTratiemtoList: me.detallePlanT,
          CrearSecuenciaTratamientoList: me.CrearSecuenciaTratamientoList
        })
        .then(function(response) {})
        .catch(function(error) {
          console.log(error);
        });
    },
    listarDetalleDiagnostico() {
      let me = this;
      var parametro = "";
      parametro = me.codConsulta;
      axios.get("api/Diagnosticos/listarFiltro/" + parametro)
        .then(function(response) {
          me.cargarTablasDetalle(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    cargarTablasDetalle(data) {
      this.detallePlanT=[];
      this.CrearSecuenciaTratamientoList=[];
      this.codDiagnostico=data[0].codDiagnostico
      this.diagnostico = data[0].diagnostico;

      for (let i = 0; i < data.length; i++) {
        this.detallePlanT.push({
          //CARGADO DE PLAN TRATAMIENTO
          codigoPlan: (this.incrementPlan = i + 1),
          codigoPlanTSistema: data[i].codPlanTratamiemto,
          orden: data[i].orden,
          planT: data[i].planT,
          cantidad: data[i].cantidad
        });
        //CARGADO DE SECUENCIA DE TRATAMIENTO
        this.CrearSecuenciaTratamientoList.push({
          codigoVueST: (this.codigoSecIncrement = i + 1),
          codigoSecuenciaTsistema: data[i].codSecTratamiento,
          fecha: data[i].fecha,
          descripcion: data[i].descripcion,
          monto: data[i].monto,
          saldoCobrado: data[i].saldoCobrado,
          saldoFaltante: data[i].monto - data[i].saldoCobrado
        });
      }

      this.CrearSecuenciaTratamientoList.forEach(element => {
        this.carcularCargaSaldoFaltante(element);
      });
    }
  }
};
</script>
<style scoped>
.titulo {
  background-color: brown;
}

.my-awesome-table {
  table-layout: fixed;
}
</style>
