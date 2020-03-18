import Vue from 'vue';
import Vuetify from 'vuetify/lib';
//import 'vuetify/src/stylus/app.styl';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        colorAzulCielo:"#56c8d8"
      },
    },
  },
  icons: {
    iconfont: 'md',
  },

});
