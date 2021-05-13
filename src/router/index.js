import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index.js'
import config from '../config.js'

import Home from '../views/Home.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Profil from '../views/Profil.vue'
import Login from '../views/Login.vue'
import ResetPasword from '../views/ResetPasword.vue'
import ChangePasword from '../views/ChangePasword.vue'
import Dashboard from '../views/Dashboard.vue'

import Colis from '../views/Colis/index.vue'
import ColisAdd from '../views/Colis/new.vue'
import ColisShow from '../views/Colis/show.vue'

import Stock from '../views/Stock/index.vue'
import StockAdd from '../views/Stock/new.vue'

import Rammassge from '../views/Rammassge/index.vue'
import RammassgeAdd from '../views/Rammassge/new.vue'
import RammassgeShow from '../views/Rammassge/show.vue'

import ColisRetour from '../views/ColisRetour/index.vue'
import ColisRetourAdd from '../views/ColisRetour/new.vue'
import ColisRetourShow from '../views/ColisRetour/show.vue'

import EquipeIndex from '../views/Equipe/index.vue'
import EquipeAdd from '../views/Equipe/new.vue'
import EquipeShow from '../views/Equipe/show.vue'

import AgenceIndex from '../views/Agence/index.vue'
import AgenceAdd from '../views/Agence/new.vue'
import AgenceShow from '../views/Agence/show.vue'

import ClientIndex from '../views/Client/index.vue'
import ClientAdd from '../views/Client/new.vue'
import ClientShow from '../views/Client/show.vue'

import LivreurIndex from '../views/Livreur/index.vue'
import LivreurAdd from '../views/Livreur/new.vue'
import LivreurShow from '../views/Livreur/show.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    redirect:'login',
    component: Home
  },{
    path: '/profil',
    name: 'profil',
    component: Profil,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/reset-pasword',
    name: 'ResetPasword',
    component: ResetPasword
  },
  {
    path: '/:token/reset-password',
    name: 'ChangePasword',
    component: ChangePasword
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },

  {
    path: '/colis-retour',
    name: 'ColisRetour',
    component: ColisRetour,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },{
    path: '/colis-retour/:id',
    name: 'Colis.add',
    component: ColisRetourAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },
  {
    path: '/colis-retour/:id/show',
    name: 'ColisRetour.show',
    component: ColisRetourShow,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },{
    path: '/stock/:id',
    name: 'Stock.add',
    component: StockAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },

  {
    path: '/colis',
    name: 'Colis',
    component: Colis,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },{
    path: '/colis/:id',
    name: 'Colis.add',
    component: ColisAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },
  {
    path: '/colis/:id/show',
    name: 'Colis.show',
    component: ColisShow,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/rammassge',
    name: 'Rammassge',
    component: Rammassge,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },{
    path: '/rammassge/:id',
    name: 'Rammassge.add',
    component: RammassgeAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
		}
  },
  {
    path: '/rammassge/:id/show',
    name: 'Rammassge.show',
    component: RammassgeShow,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/equipe',
    name: 'Equipe',
    component: EquipeIndex,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/equipe/:id',
    name: 'Equipe.add',
    component: EquipeAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/equipe/:id/show',
    name: 'Equipe.show',
    component: EquipeShow,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/agence',
    name: 'Agence',
    component: AgenceIndex,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/agence/:id',
    name: 'Agence.add',
    component: AgenceAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/agence/:id/show',
    name: 'Agence.show',
    component: AgenceShow,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/client',
    name: 'Client',
    component: ClientIndex,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/client/:id',
    name: 'Client.add',
    component: ClientAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/client/:id/show',
    name: 'Client.show',
    component: ClientShow,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/livreur',
    name: 'Livreur',
    component: LivreurIndex,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/livreur/:id',
    name: 'Livreur.add',
    component: LivreurAdd,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  {
    path: '/livreur/:id/show',
    name: 'Livreur.show',
    component: LivreurShow,
    meta: {
			requiresAuth: true,
			authName: 'agency',
    }
  },
  // and finally the default route, when none of the above matches:
  { path: "*", component: PageNotFound }
]

const router = new VueRouter({
	mode: 'history',
  base: config.base_name,
	routes,
	linkExactActiveClass: 'active',
    scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
})

router.beforeResolve((to, from, next) => {
  store.dispatch('loader')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && to.meta.authName == store.getters.getAuthName) {
      store.dispatch('check_auth');
      next()
      return
    }
		store.dispatch('logout')
		router.push('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
    setTimeout(() => {
        store.dispatch('loader')
    }, 500);
})

export default router
