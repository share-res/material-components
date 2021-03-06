import Component from 'vue-class-component';

var Velocity = require('velocity-animate');

@Component({
    props: {
        active: {
            required: false,
            'default': null
        }
    },
    watch: {
        active: function (value) {
            this.$broadcast('tab::select', value);
        }
    },
    events: {
        'tabs::on-select': function (tab) {
            this.select(tab);
        }
    },
    template: require('./tabs.html')
})
export default class Tabs {
    private $els: any;
    private $children: any[];

    private activeTab: any;
    private active: string;
    private indicator: any;

    ready() {
        window.addEventListener("resize", this.resizeIndicator);
    }

    data() {
        return {
            indicator: {
                left: '0',
                right: '0'
            }
        }
    }

    get tabsCount() {
        if (!this.$children) {
            return 0;
        }
        else {
            return this.$children.length;
        }
    }

    select(tab) {
        this.activeTab = tab;
        this.active = tab.id;
        var target = tab.$el;
        var parent = target.parentElement;
        this.moveIndicator(
            this.indicator.left, target.offsetLeft,
            this.indicator.right, parent.offsetWidth - target.offsetLeft - target.offsetWidth);
        return true;
    }

    resizeIndicator() {
        if (!this.activeTab) {
            return;
        }

        var indicator: HTMLElement = this.$els.indicator;

        var index = this.activeTab.index;
        var tab = this.activeTab.$el;
        var tabs = tab.parentElement;
        var tabs_width = tabs.offsetWidth;
        var tab_width = Math.max(tabs_width, tabs.scrollWidth) / this.tabsCount;

        if (tab_width !== 0 && tabs_width !== 0) {
            indicator.style.right = (tabs_width - ((index + 1) * tab_width)) + "px";
            indicator.style.left = (index * tab_width) + "px";
        }
    }

    moveIndicator(left, newLeft, right, newRight) {
        var indicator = this.$els.indicator;
        // Update indicator
        if ((newLeft - left) >= 0) {
            Velocity(indicator, 
                {right: newRight}, 
                {duration: 300, queue: false, easing: 'easeOutQuad'}
            );
            Velocity(indicator, 
                {left: newLeft}, 
                {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90}
            );
        }
        else {
            Velocity(indicator, 
                {left: newLeft}, 
                {duration: 300, queue: false, easing: 'easeOutQuad'});
            Velocity(indicator, 
                {right: newRight}, 
                {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
        }
    }
}