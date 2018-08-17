import Vue from 'vue';
import Vuex from 'vuex';
import util from  '@/utils';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        session:null,
        openID:null
    },
    mutations: {
        setSession(state,user){
            sessionStorage.setItem( 'user' ,JSON.stringify(user));
            state.session = user;
        },
        setOpenID(state,openID){
            sessionStorage.openID  = openID;
            state.openID  = openID;
        },
        clearSession(state) {
            sessionStorage.removeItem( 'user');
            state.session = null;
        }

    },
    actions: {

    },
    modules: {
    }
});

(function(){

    if(sessionStorage.user) {
        store.commit('setSession', JSON.parse(sessionStorage.user));
    }
    let openID =  sessionStorage.openID || util.getRequest('weChatOpenId') || util.getRequest('aliPayOpenId');
    if(openID) {
        store.commit('setOpenID', openID);
    }

    console.info('sessionStorage',sessionStorage)
})();

export default store;
