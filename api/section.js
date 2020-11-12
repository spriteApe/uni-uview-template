import Vue from 'vue'

export default {
	index: params => Vue.prototype.$u.get('/ebapi/public_api/index', params),
	hot_search: params => Vue.prototype.$u.post('/ebapi/store_api/hot_search', params)
}
