<template>
	<view>
		<u-button type="primary" @click='handle'>发送ajax</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			handle() {
				this.$u.api.index({
					a: 88
				}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
