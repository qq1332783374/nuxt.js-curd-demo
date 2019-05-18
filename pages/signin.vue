<template>
  <div class="signin">
    <form class="form">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" name="username" class="form-control" id="username" v-model="loginInfo.username">
      </div>
      <div class="form-group">
        <label for="password1">密码</label>
        <input type="password" name="password" class="form-control" id="password" v-model="loginInfo.password">
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="signin()">登录</button>
        <nuxt-link to="/signup">注册</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data () {
        return {
            loginInfo: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async signin () {
            let params = new URLSearchParams
            params.append('username', this.loginInfo.username)
            params.append('password', this.loginInfo.password)
            let {data} = await this.$axios.post('/signin', params)
                console.log(data)
                if (data.status) {
                    alert(data.msg)
                    localStorage.setItem('user', JSON.stringify(data.user))
                    this.$router.push({path: '/', param: {userID: data.user._id}})
                } else {
                    alert(data.msg)
                }
        }
    }
  }

</script>

<style scoped>
  .signin {
    width: 800px;
    margin: 20px auto;
  }

</style>
