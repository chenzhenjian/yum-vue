import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/element-variables.scss';


import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.use(ElementUI);

// Permission directive
Vue.directive('has', {
    bind: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el);
        }
    }
});

Vue.directive('loadmore', {
    inserted(el, binding) {
        // 获取element-ui定义好的scroll盒子
        // const SELECTWRAP_DOM = el.querySelector('.scroll');
        let sign = 10;
        let scrollFun = () => {
            /*
              * scrollHeight 获取元素内容高度(只读)
              * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
              * clientHeight 读取元素的可见高度(只读)
              * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
              * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
            */

            // 定义默认的向上滚于乡下滚的边界// 注意: && el.scrollTop
            const CONDITION = ((el.scrollHeight - el.scrollTop - el.clientHeight < 10) && el.scrollTop > sign);
            //console.log(el.scrollHeight - el.scrollTop - el.clientHeight,el.scrollTop , sign)
            if (el.scrollTop > sign) {
                sign = el.scrollTop;
                // console.log('向下')
            }
            if (el.scrollTop < sign) {
                sign = el.scrollTop;
                // console.log('向上')
            }
            if (CONDITION) {
                binding.value();
            }
        };
        el.removeEventListener('scroll', scrollFun);
        el.addEventListener('scroll', scrollFun);
    }
});


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});

