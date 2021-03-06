import Component from 'vue-class-component';
import docSnippet from '../snippet';
import docDefaultModal from './default';
import docFixedFooterModal from './fixed-footer';
import docBottomModal from './bottom';

import events from '../../mixins/events';

@Component({
    components: {
        docSnippet,
        docDefaultModal,
        docFixedFooterModal,
        docBottomModal
    },
    mixins: [
        events
    ],
    template: require('./modals.html')
})
export default class Modals {
    data() {
        return {
            api: require('../../components/modal/modal-api.json'),
            snippets: {
                defaultModal: require('./default/default.snippet.html'),
                fixedFooterModal: require('./fixed-footer/fixed-footer.snippet.html'),
                bottomModal: require('./bottom/bottom.snippet.html')
            },
            src: {
                script: require("!!html!highlightjs?lang=ts!../../components/modal/index.ts"),
                template: require('!!html!highlightjs?lang=html!../../components/modal/modal.html'),
                style: require('!!html!highlightjs?lang=scss!../../components/modal/modal.scss')
            }
        }
    }
}