import { createApp } from 'vue';
import './assets/css/bootstrap.min.css';
import './assets/fonts/fontawesome-all.min.css';
import './assets/fonts/font-awesome.min.css';
import './assets/fonts/fontawesome5-overrides.min.css';
import 'bootstrap';
import '@/assets/css/theme.css';
import 'primevue/resources/primevue.min.css';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import Card from 'primevue/card';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import TreeSelect from 'primevue/treeselect';
import Chips from 'primevue/chips';
import MultiSelect from 'primevue/multiselect';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import AutoComplete from 'primevue/autocomplete';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import Divider from 'primevue/divider';
import Chip from 'primevue/chip';
import InputSwitch from 'primevue/inputswitch';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Tooltip from 'primevue/tooltip';
import Listbox from 'primevue/listbox';
import ConfirmPopup from 'primevue/confirmpopup';
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import ColorPicker from 'primevue/colorpicker';
import ProgressSpinner from 'primevue/progressspinner';
import App from './App.vue';
import Editor from 'primevue/editor';
import Skeleton from 'primevue/skeleton';
import AppAuth from './views/AppAuth.vue';
import router from './router';
import store from './store';
import UtilisateurService from './services/UtilisateurService';
import ObjectUtils from './utils/ObjectUtils';
import Locale_FR from './constants/Locale_FR';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Fieldset from 'primevue/fieldset';
import ToggleButton from 'primevue/togglebutton';
import Chart from 'primevue/chart';
import OrderList from 'primevue/orderlist';
import './assets/css/monStyle.css';
import { createMetaManager } from 'vue-meta';

const { isObjectEmpty } = ObjectUtils();
const { utilisateur } = UtilisateurService();

const app = createApp(App);
// PrimeVue components
app
  .component('Fieldset', Fieldset)
  .component('ToggleButton', ToggleButton)
  .component('Accordion', Accordion)
  .component('AccordionTab', AccordionTab)
  .component('Editor', Editor)
  .component('Card', Card)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('InputText', InputText)
  .component('Dropdown', Dropdown)
  .component('Button', Button)
  .component('Calendar', Calendar)
  .component('TreeSelect', TreeSelect)
  .component('Chips', Chips)
  .component('Chip', Chip)
  .component('MultiSelect', MultiSelect)
  .component('TriStateCheckbox', TriStateCheckbox)
  .component('AutoComplete', AutoComplete)
  .component('RadioButton', RadioButton)
  .component('Checkbox', Checkbox)
  .component('FileUpload', FileUpload)
  .component('Toast', Toast)
  .component('Divider', Divider)
  .component('InputSwitch', InputSwitch)
  .component('Row', Row)
  .component('ColumnGroup', ColumnGroup)
  .component('SelectButton', SelectButton)
  .component('Dialog', Dialog)
  .component('Avatar', Avatar)
  .component('Listbox', Listbox)
  .component('ConfirmPopup', ConfirmPopup)
  .component('Textarea', Textarea)
  .component('Message', Message)
  .component('InlineMessage', InlineMessage)
  .component('ColorPicker', ColorPicker)
  .component('ProgressSpinner', ProgressSpinner)
  .component('Skeleton', Skeleton)
  .component('Chart', Chart)
  .component('OrderList', OrderList);

// Directives
app.directive('tooltip', Tooltip);

app.use(store);
app.use(router);
app.use(PrimeVue, { locale: Locale_FR });
app.use(ToastService);
app.use(ConfirmationService);
app.use(createMetaManager()); // For manage meta data

app.mount('#app');
