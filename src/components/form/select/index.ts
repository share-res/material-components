import Component from 'vue-class-component';
import mdDropdownList from '../../dropdown-list';

import inputMixin from '../../../mixins/input';
import clickAway from '../../../directives/click-away';
import bindBoolean from '../../../directives/bind-boolean';

var Vue: any = Vue || require('vue');

@Component({
    props: {
        value: {
            required: false,
            'default': null
        },
        name: {
            type: String,
            required: false,
            'default': null,
            twoWay: false
        }
    },
    events: {
        'select::select': function(value) {
            if (Array.isArray(this.value)) {
                this.value.push(value);
            }
            else {
                this.value = value;
                this.close();
            }
            this.$broadcast('option::select', value);
            return true;

        },
        'select::unselect': function(value) {
            if (Array.isArray(this.value)) {
                this.value.$remove(value);
            }
            else {
                this.value = value;
            }
            this.$broadcast('option::unselect', value);
            return true;
        }
    },
    watch: {
        value: function () {
            this.$nextTick(this.refreshDropdownOptions)
        }
    },
    components: {
        mdDropdownList
    },
    directives: {
        clickAway,
        bindBoolean
    },
    mixins: [
        inputMixin
    ],
    template: require('./select.html')
})
export default class SelectField {
    private $els: any;
    private $getAllChildren: any;
    private $broadcast: any;
    private _slotContents: any;

    private active: boolean;
    private options: any;
    private defaultSelect: string;
    private value: any;

    data() {
        return {
            active: false,
            options: {}
        }
    }

    compiled() {
        var options = this.$getAllChildren().filter((c: any) => {return 'SelectOption' == c.$options.name});
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var opt: any = this.createOption(option);
            Vue.set(this.options, opt.value, opt);
        }
    }

    ready() {
       this.refreshDropdownOptions()
    }

    createOption(option: any) {
        var content = option.content;
        var value = option.value;
        var disabled = option.disabled;

        return {
            content: content.textContent,
            value: value,
            disabled: disabled
        };
    }

    get multiple() {
        return Array.isArray(this.value);
    }

    get valueContent() {
        return Array.isArray(this.value) ? this.valueContentMultiple : this.valueContentSingle;
    }

    get valueContentSingle() {
        return this.options[this.value] ? this.options[this.value].content : '';
    }

    get valueContentMultiple() {
        if (this.value.length) {
            return this.value.map((value) => {
                return this.options[value] ? this.options[value].content : '';
            }).join(', ');
        }
        else {
            return this.options[this.defaultSelect] ? this.options[this.defaultSelect].content : ''
        }
    }

    get field() {
        return this.$els.field;
    }

    hasSlot(name = 'default') {
        return name in this._slotContents;
    }

    refreshDropdownOptions() {
        var options = Array.prototype.slice.call(this.field.options);
        options.forEach((o: HTMLOptionElement) => {
            if (o.selected) {
                this.$broadcast('option::select', o.value)
            }
            else if (this.multiple) {
                this.$broadcast('option::unselect', o.value)
            }
        });
    }

    open(e) {
        if (!this.active) {
            this.active = true;
            this.$broadcast('dropdown-list::open', e);
        }
    }

    close() {
        if (this.active) {
            this.active = false;
            this.$broadcast('dropdown-list::close');
        }
    }
}