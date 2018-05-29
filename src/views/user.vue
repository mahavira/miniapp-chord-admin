<template>
  <div>
    <table class="table text-center table-hover">
      <thead>
        <tr>
          <th>avatar</th>
          <th>nickName</th>
          <th>gender</th>
          <th>country</th>
          <th>province</th>
          <th>city</th>
          <th>create_time</th>
        </tr>
        <tr v-if="!isLoading&&!data.length">
          <td colspan="6" class="no-data">无数据</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.openId">
          <td><img :src="item.avatarUrl" style="width:50px;"></td>
          <td>{{item.nickName}}</td>
          <td>{{item.gender}}</td>
          <td>{{item.country}}</td>
          <td>{{item.province}}</td>
          <td>{{item.city}}</td>
          <td>{{item.create_time}}</td>
        </tr>
      </tbody>
    </table>

    <el-pagination
      style="float:right"
      @current-change="onChangePage"
      :current-page.sync="page"
      :page-size="size"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      isLoading: false,
      page: 1,
      size: 10,
      total: 0
    }
  },
  methods: {
    fetch () {
      this.isLoading = true
      this.$http.get(`weapp/user/all`, {
        params: {
          page: this.page,
          limit: this.size
        }
      }).then(({ data }) => {
        if (data.code === 0) {
          this.data = data.data.map(n => {
            return Object.assign({
              create_time: n.create_time,
              last_visit_time: n.last_visit_time
            }, JSON.parse(n.user_info))
          })
          this.total = data.data.totalElements
        } else {
          this.$notify.error({
            title: '错误',
            message: data.msg || '数据列表请求错误'
          })
          this.data = []
          this.total = 0
        }
        console.log(this.data)
        this.isLoading = false
      }, () => {
        this.$notify.error({
          title: '错误',
          message: '数据列表请求错误'
        })
        this.data = []
        this.total = 0
        this.isLoading = false
      })
    },
    onChangePage (page) {
      this.page = page
      this.fetch()
    }
  },
  created () {
    this.fetch()
  }
}
</script>