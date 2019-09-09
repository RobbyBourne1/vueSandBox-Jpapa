import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared'
import { GET_HEROES, ADD_HERO, DELETE_HERO, UPDATE_HERO } from "./mutation-types";

Vue.use(Vuex)

const state = {
  heroes: [],
}
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes
  },
  [ADD_HERO](state, hero){
    state.heroes.push(hero)
  },
  [DELETE_HERO](state, hero){
    state.heroes = [...state.heroes.filter(f => f.id != hero.id)]
  },
  [UPDATE_HERO](state, hero){
    const index = state.heroes.findIndex(f => f.id == hero.id)
    state.hereos.splice(index, 1, hero)
    state.heroes = [...state.hereos]
  }
}
const actions = {
  async getHeroesAction({ commit }) {
    const heroes = await dataService.getHeroes()
    commit(GET_HEROES, heroes)
  },
  async addHeroAction({commit}, hero){
    const addedHero = await dataService.addHero(hero)
    commit(ADD_HERO, addedHero)
  },
  async deleteHeroAction({commit}, hero){
    const deletedHeroId = await dataService.deleteHero(hero)
    commit(DELETE_HERO, deletedHeroId)
  },
  async updateHeroAction({commit}, hero){
    const updatedHero = await dataService.updateHero(hero)
    commit(UPDATE_HERO, updatedHero)
  }
}
const getters = {
  getHeroById: state => id => state.heroes.find(f => f.id == id)
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV != 'production',
  state,
  mutations,
  actions,
  getters,
})
