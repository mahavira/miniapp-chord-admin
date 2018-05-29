<template>
  <div>
    <table class="table text-center table-hover">
      <thead>
        <tr>
          <th>open_id</th>
          <th>text</th>
          <th>create_time</th>
        </tr>
        <tr v-if="!isLoading&&!data.length">
          <td colspan="6" class="no-data">无数据</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.openId">
          <td>{{item.open_id}}</td>
          <td>{{item.text}}</td>
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
      this.$http.get(`weapp/suggest/all`, {
        params: {
          page: this.page,
          limit: this.size
        }
      }).then(({ data }) => {
        if (data.code === 0) {
          this.data = data.data
          this.total = data.totalElements
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