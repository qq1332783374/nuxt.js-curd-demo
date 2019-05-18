<template>
    <div class="editStu">
        <div class="text-center">
            <h1 class=" text-success">修改学生信息</h1>
        </div>
        <form class="form">
            <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" name="name" id="name" class=" form-control" v-model="editInfo.name">
            </div>
            <div class="form-group">
                <label for="phone">电话</label>
                <input type="text" name="phone" id="phone" class=" form-control" v-model="editInfo.phone">
            </div>
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="text" name="email" id="email" class=" form-control" v-model="editInfo.email">
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="button" @click="editStu()">添加</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'editStu',
    data () {
        return {
            editInfo: {
                _id: '',
                name: '',
                phone: '',
                email: ''
            }
        }
    },
    methods: {
        async getStuInfo () {
            let { data } = await this.$axios.get(`/stu/getStuInfo/${this.editInfo._id}`)
                console.log(data)
                this.editInfo.name = data.stuInfo.name
                this.editInfo.phone = data.stuInfo.phone
                this.editInfo.email = data.stuInfo.email
        },
        async editStu() {
            let params = new URLSearchParams
            params.append('_id', this.editInfo._id)
            params.append('name', this.editInfo.name)
            params.append('phone', this.editInfo.phone)
            params.append('email', this.editInfo.email)

            let { data } = await this.$axios.post('/stu/edtiStuInfo', params)
                if (data.status) {
                    alert(data.msg)
                    this.$router.push({path: '/'})
                }
        }
    },
    mounted () {
        this.editInfo._id = this.$route.query._id

        this.getStuInfo()
    }
}
</script>

<style scoped>
.editStu {
    width: 800px;
    margin: 20px auto;
}
</style>
