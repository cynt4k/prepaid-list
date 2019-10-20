import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import de from 'vuetify/src/locale/de';
import i18n from '@/i18n';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    t: (key: string, ...params: Array<string | number>): string => i18n.t(key, params) as string
  },
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: true
  }
});
