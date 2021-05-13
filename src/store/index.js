import Vue from 'vue'
import Vuex from 'vuex'
import lodash from 'lodash'
import ApiService from "../services/api.service";
import JwtService from "../services/jwt.service";
import createPersistedState from "vuex-persistedstate";
import Gate from "./../Gate";
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		status: '',
		token: JwtService.getToken().token || '',
		user: null,
		pre_loader: false,
	},
	mutations: {
		auth_request(state) {
			state.status = 'loading'
		},
		auth_success(state, { token, user }) {
			state.status = 'success'
			state.token = token
			state.user = user
		},
		auth_error(state) {
			state.status = 'error'
		},
		logout(state) {
			state.status = ''
			state.token = ''
			state.user = null
		},
		reset_auth(state) {
			console.log("reset_auth")
			JwtService.unsetToken();
			state.status = ''
			state.token = ''
			state.user = null
		},
		set_auth(state, { user }) {
			state.user = user
		},
		loader(state) {
			state.pre_loader = !state.pre_loader
		},
		remove_notification(state, {notification}){
			state.user.notifications = lodash.filter(state.user.notifications, function(o) {
				return o.id!=notification.id;
			});
		}
	},
	actions: {
		login({ commit }, userData) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				ApiService.post(Vue.prototype.$app_url + "/api/auth/login", userData)
					.then(response => {
						const token = response.data.access_token;
						const user = response.data.user;
						JwtService.setToken(token, "agency", user);
						Vue.prototype.$gate = new Gate(user);
						ApiService.setHeader();
						commit('auth_success', {token,user})
						resolve(response)
					})
					.catch(error => {
						console.log("login error", error)
						commit('auth_error')
						JwtService.unsetToken();
						reject(error)
					})

			})
		},

		logout({ commit }) {
			return new Promise((resolve) => {
				commit('logout')
				JwtService.unsetToken();
				resolve()
			})
		},

		check_auth({ commit }) {
			if (JwtService.getToken().token) {
				ApiService.setHeader();

				ApiService.get(Vue.prototype.$app_url + "/api/v1/agency/auth")
					.then(res => {
						const user = res.data
						commit('set_auth', {user})
					})
					.catch(error => console.log("check_auth error", error))
			} else {
				commit('reset_auth');
			}
		},

		loader({ commit }) {
			commit('loader');
		},

		remove_notification({ commit }, { notification }) {
			commit('remove_notification', { notification });
		},
	},
	getters: {
		isLoggedIn: function () {
			return JwtService.getToken().token ? true : false
		},

		getAuthName: function () {
			return JwtService.getToken().authName
		}
	},
	modules: {
	
	},
	plugins: [createPersistedState()],
})
