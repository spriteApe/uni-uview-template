let domainName = ''
if (process.env.NODE_ENV === 'development') {
	domainName = ''
} else {
	domainName = ''
}

let port = domainName.startsWith('https') ? '443' : '80'


export default {
	port,
	domainName,
	loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	loadingText: '请求中...', 
	toastDelay: 1000, //toast显示后多久执行回调
}







