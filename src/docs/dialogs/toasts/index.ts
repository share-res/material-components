import Component from 'vue-class-component';

import toast from '../../../mixins/toast';

import mdButton from '../../../components/button';

@Component({
    components: {
        mdButton
    },
    mixins: [
        toast
    ],
    template: require('./toasts.html')
})
export default class Toasts {
    private toast: any;
    
    makeAToast(msg) {
        this.toast(msg, 4000, '', () => {
            alert('Your toast was dismissed');
        })
    }
}

