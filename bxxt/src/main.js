import { createApp } from 'vue';
import vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {button} from 'vant';
import {Swipe, SwipeItem} from 'vant';
import {Cascader} from 'vant';
import {Form, Field} from 'vant';
import {Popup} from 'vant';
import { Dialog } from 'vant';
import { Lazyload } from 'vant';
import { Uploader } from 'vant';
import { Search } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Tab, Tabs } from 'vant';
import {Image} from 'vant';
import {List} from 'vant';
import { PullRefresh } from 'vant';
import {Icon} from 'vant'

createApp(App)
    .use(Image)
    .use(Icon)
    .use(Cell)
    .use(PullRefresh)
    .use(List)
    .use(CellGroup)
    .use(store)
    .use(Dialog)
    .use(Search)
    .use(Tab)
    .use(Tabs)
    .use(router)
    .use(Uploader)
    .use(button)
    .use(Swipe)
    .use(SwipeItem)
    .use(Cascader)
    .use(Form)
    .use(CellGroup)
    .use(Lazyload)
    .use(Field)
    .use(Popup)
    .use(CellGroup)
    .mount('#app')
