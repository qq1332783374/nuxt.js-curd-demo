<template>
  <section class="container">
    <div class="no-singin" v-if="!userInfo.username">
      <nuxt-link to="/signup">注册</nuxt-link>
      <nuxt-link to="/signin">登录</nuxt-link>
    </div>
    <div class="on-singin" v-else>
      <span>用户：</span> <span>{{userInfo.username}}</span> | <span style="cursor: pointer;" @click="signout()">退出登录</span>
    </div>
    <div class="main">
      <div>
        <button class="btn btn-success" @click="toAddStu">添加</button>
      </div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <td>#</td>
            <td>姓名</td>
            <td>电话</td>
            <td>邮箱</td>
            <td>
              操作
            </td>
          </tr>
        </thead>
        <tbody v-if="stuList.length != 0">
          <tr v-for="(item, index) in stuList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.email }}</td>
            <td>
              <button class="btn btn-primary" @click="toEditStu(item)">修改</button>
              <button class="btn btn-danger" @click="delStu(item)">删除</button>
            </td>
          </tr>
        </tbody>
        <tfoot v-else>
          <tr class=" text-center">
            <td colspan="5">暂无数据</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
export default {
  components: {
    Logo
  },
  data () {
    return {
      userInfo: {},
      stuList: [],
    }
  },
  methods: {
    signout () {
      if (confirm('是否退出登录')) {
        localStorage.removeItem('user')
        this.$router.push({path: '/signin'})
      }
    },
    async delStu (item) {
      console.log(item)
      let { data } = await this.$axios.get(`/stu/delStuInfo/${item._id}`)
        console.log(data)
        if (data.status) {
          alert(data.msg)
          this.getStuList()
        }
    },
    toEditStu (item) {
      console.log(item)
      this.$router.push({path: '/editStu', query: {_id: item._id}})
    },
    toAddStu () {
      if (this.userInfo._id) {
        this.$router.push({path: '/addStu', query: {_id: this.userInfo._id}})
      }
    },
    async getStuList () {
      let { data } = await this.$axios.get(`/stu/selAllStu/${this.userInfo._id}`)
        if (data.status) {
          this.stuList = data.stuList
        }
    },
  },
  mounted () {
    if (localStorage.user) {
      this.userInfo = JSON.parse(localStorage.user)
    } else {
      this.$router.push({path:'/signin'})
    }

    // 获取学生列表
    console.log(this.getStuList())
  }
}
</script>

<style scoped>

</style>
