<template>
  <div>
    <table class="table text-center table-hover">
      <thead>
        <tr>
          <th>avatar</th>
          <th>nickName</th>
          <th>chord</th>
          <th>scale</th>
          <th>duration</th>
          <th>audio</th>
          <th>r_player</th>
          <th>s_song</th>
          <th>audio</th>
          <th>is_pass</th>
          <th>create_time</th>
        </tr>
        <tr v-if="isLoading&&!data.length">
          <td colspan="11" class="no-data">无数据</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.openId">
          <td><img :src="item.avatarUrl" style="width:50px;"></td>
          <td>{{item.nickName}}</td>
          <td>{{item.chord}}</td>
          <td>{{item.scale}}</td>
          <td>{{Math.floor((item.duration/1000))}}</td>
          <td>
            <audio :src="item.src" controls="controls"></audio>
          </td>
          <td>{{item.r_player}}</td>
          <td>{{item.r_song}}</td>
          <td>{{item.is_pass}}
            <a href="javascript:;" @click="pass(item)">{{item.is_pass==1?'已通过':'未通过'}}</a>
          </td>
          <td>{{item.create_time}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {},
      isLoading: false,
      maxId: 0,
      isHasData: true,
      size: 10,
      total: 0
    }
  },
  methods: {
    fetch () {
      if (this.isLoading) return
      this.isLoading = true
      this.$http.get(`weapp/audio/all`, {
        params: {
          max_id: this.maxId,
          limit: this.size
        }
      }).then(({ data }) => {
        if (data.code === 0) {
          data.data.forEach(n => {
            n.id -= 0
            this.data[n.id] = Object.assign(JSON.parse(n.user_info), n)
          })
          var ks = Object.keys(this.data)
          this.maxId = Math.min.apply(null, ks)
          this.total = data.data.totalElements
          if (data.data.length < this.size) {
            this.isHasData = false
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: data.msg || '数据列表请求错误'
          })
          this.data = []
          this.total = 0
        }
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
    },
    pass (item) {
      var isPass = item.is_pass - 0
      this.$http.post(`weapp/audio/pass`, {
        id: item.id,
        is_pass: isPass ? 0 : 1
      }).then(({ data }) => {
        if (data.code === 0) {
          item.is_pass = isPass ? 0 : 1
        } else {
          this.$notify.error({
            title: '错误',
            message: data.msg || '请求错误'
          })
        }
      }, () => {
        this.$notify.error({
          title: '错误',
          message: '请求错误'
        })
      })
    }
  },
  created () {
    this.fetch()
  },
  mounted () {
    const el = document.querySelector('.el-main')
    el.addEventListener('scroll', () => {
      var height = el.clientHeight
      var scrollHeight = el.scrollHeight
      var top = el.scrollTop
      if (top + height >= scrollHeight) {
        if (this.isHasData) this.fetch()
        console.log(10)
      }
    })
  }
}
</script>