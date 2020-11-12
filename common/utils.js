import golbalConfig from './config.js'
import Vue from 'vue'
const baseUrl = golbalConfig.domainName + '/api'


export default {
	// 上传多张图片
	uploadFile(option = {}) {
		let startTime = +new Date()
		let time = setTimeout(() => {
			uni.showLoading({
				title: golbalConfig.loadingText,
			})
		}, golbalConfig.loadingTime)
		return new Promise((resolve, reject) => {
			let resolveArr = []
			let rejectArr = []

			function uploadFile(index = 0) {
				// 结束递归
				if (!option.filePath || !option.filePath[index]) {
					clearTimeout(time)
					let endTime = +new Date()
					if (endTime - startTime > golbalConfig.loadingTime) uni.hideLoading()
					if (rejectArr.length > 0) {
						reject(rejectArr)
						Vue.prototype.$u.toast(rejectArr[0].errMsg);
					} else {
						resolve(resolveArr)
					}
					return
				}

				uni.uploadFile({
					url: baseUrl + (option.url || ''),
					filePath: option.filePath[index],
					name: option.name || 'img',
					formData: option.formData,
					header: option.header || {
						'content-type': 'application/json', // 默认值
					},
					success(res) {
						let data = JSON.parse(res.data)
						if (data.code >= 200 && data.code < 400) {
							resolveArr.push(data)
						} else {
							rejectArr.push(res)
						}
					},
					fail(err) {
						rejectArr.push(err)
					},
					complete(e) {
						uploadFile(++index)
					}
				});

			}
			uploadFile()
		})
	},
	// 支付
	payment(option = {}) {
		return new Promise((resolve, reject) => {
			Vue.prototype.$u[option.method](option.url,option.data,option.header).then(res => {
				let {
					timeStamp,
					nonceStr,
					package: _package,
					signType,
					paySign
				} = res.data
				// 发起支付
				uni.requestPayment({
					timeStamp,
					nonceStr,
					package: _package,
					signType,
					paySign,
					success(res) {
						console.log(res)
						resolve(res)
					},
					fail(err) {
						console.log(err)
						reject(err)
					},
					complete() {}
				})
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 提示用户,并跳转页面
	showToast(title, icon = 'none') {
		return new Promise((resolve, reject) => {
			uni.showToast({
				title,
				icon,
				mask: true,
				success() {
					setTimeout(() => {
						resolve()
					}, golbalConfig.toastDelay)
				},
				fail(err) {
					reject(err)
				}
			})
		})

	},
}
