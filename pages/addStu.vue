<template>
    <div class="addStu">
        <div class="text-center">
            <h1 class=" text-success">添加学生信息</h1>
        </div>
        <form class="form">
            <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" name="name" id="name" class=" form-control" v-model="addStuInfo.name">
            </div>
            <div class="form-group">
                <label for="phone">电话</label>
                <input type="text" name="phone" id="phone" class=" form-control" v-model="addStuInfo.phone">
            </div>
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="text" name="email" id="email" class=" form-control" v-model="addStuInfo.email">
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="button" @click="addStu()">添加</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            addStuInfo: {
                adminId: '',
                name: '',
                phone: '',
                email: ''
            }
        }
    },
    methods: {
        async addStu () {
            let params = new URLSearchParams

            params.append('adminId', this.addStuInfo.adminId)
            params.append('name', this.addStuInfo.name)
            params.append('phone', this.addStuInfo.phone)
            params.append('email', this.addStuInfo.email)

            let {data} = await this.$axios.post('/stu/addStu', params)
                console.log(data)
                if (data.status) {
                    alert(data.msg)
                    this.$router.push({path: '/'})

                    this.addStuInfo.name = ''
                    this.addStuInfo.phone = ''
                    this.addStuInfo.email = ''
                }
        }
    },
    mounted () {
        console.log(this.$route.query._id)
        this.addStuInfo.adminId = this.$route.query._id
    }
}
</script>

<style scoped>
.addStu {
    width: 800px;
    margin: 20px auto;
}
</style>
