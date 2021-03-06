/// <reference path="../typings/vue/vue.d.ts"/>
/// <reference path="../typings/ts.d.ts"/>
/// <reference path="../typings/doc.d.ts"/>

var Vue: any = Vue || require('vue');
var VueRouter: any = require('vue-router');

import mapping = require('./mapping');
import App = require('./doc-app');

import components from '../components';
import directives from '../directives';
import mixins from '../mixins';
import {BaseComponent} from '../components';

import vueLogo from './logo/vue'
import materializeLogo from './logo/materialize';
import docApi from './doc-api';
import docSources from './doc-sources';
import docSnippet from './snippet';
import docTabs from './doc-tabs';

require('./doc-main.scss');

export = {
    run: function (app) {

        Vue.config.debug = true;
        Vue.config.async = false;
        
        Vue.use(VueRouter);
        Vue.component('vue-logo', vueLogo);
        Vue.component('materialize-logo', materializeLogo);
        Vue.component('doc-api', docApi);
        Vue.component('doc-sources', docSources);
        Vue.component('doc-snippet', docSnippet);
        Vue.component('doc-tabs', docTabs);

        var router = new VueRouter({
            history: false,
            root: '/'
        });

        router.map(mapping);

        router.start(App, app);
    },
    registerAll: function () {
        this.registerComponents();
        this.registerDirectives();
    },
    registerComponents: function () {
        for (var componentName in components) {
            Vue.component(componentName, components[componentName]);
        }
    },
    registerDirectives: function () {
        for (var directiveName in directives) {
            Vue.directive(directiveName, components[directiveName]);
        }
    },
    registerMixins: function () {
        for (var i = 0; i < mixins.length; i++) {
            Vue.mixin(mixins[i]);
        }
    },
    BaseComponent,
    components,
    directives,
    mixins,
    Vue: Vue
}

