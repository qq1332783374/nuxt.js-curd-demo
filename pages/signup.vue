<template>
    <div class="signup">
        <div>
            <form class="form">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" name="username" v-model="userInfo.username" class="form-control" id="username">
                </div>
                <div class="form-group">
                    <label for="password1">密码</label>
                    <input type="password" name="password1" v-model="userInfo.password1"  class="form-control" id="password1">
                </div>
                <div class="form-group">
                    <label for="password2">再次输入密码</label>
                    <input type="password" name="password2" v-model="userInfo.password2"  class="form-control" id="password2">
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary" @click="signup()">注册</button>
                    <nuxt-link to="/signin">登录</nuxt-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'signup',
    data () {
        return {
            userInfo: {
                username: '',
                password1: '',
                password2: ''
            }
        }
    },
    methods: {
        async signup () {
            let params = new URLSearchParams
            params.append('username', this.userInfo.username)
            params.append('password1', this.userInfo.password1)

            // await this.$axios.post('/singup', params).then((res) => {
            //     console.log(res.data)
            // })
            let {data} = await this.$axios.post('/singup', params)
                if (data.status) {
                    alert(data.msg)
                } else {
                    alert(data.msg)
                    return
                }
        }
    },
}
</script>

<style scoped>
.signup {
    width: 800px;
    margin: 20px auto;
}
</style>
