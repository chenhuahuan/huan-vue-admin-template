<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.name')" v-model="listQuery.name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.rate" :placeholder="$t('table.rate')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in rateOptions" :key="item" :label="item" :value="item"/>
      </el-select>

      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <router-link :to="'/api/create/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">{{ $t('table.add') }}</el-button>
      </router-link>
    </div>
    <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" width="50"/>
      <el-table-column align="center" label="ID" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="400px" label="Name">
        <template slot-scope="scope">
          <router-link :to="'/api/edit/'+scope.row.id" class="link-type">
            <span>{{ scope.row.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="Business">
        <template slot-scope="scope">
          <span>{{ scope.row.business }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" min-width="100px" label="Rate">-->
      <!--<template slot-scope="scope">-->
      <!--<svg-icon v-for="n in +scope.row.rate" :key="n" icon-class="star" class="meta-item__icon"/>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column class-name="status-col" align="center" label="Status" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Last Modified">
        <template slot-scope="scope">
          <span>{{ scope.row.date_modified | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/api/edit/'+scope.row.id">
            <el-button type="success" size="mini" icon="el-icon-caret-right" plain>{{ $t('table.run') }}</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit">{{ $t('table.edit') }}</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">{{ $t('table.delete') }}</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { fetchList, fetchTestcaseAll } from '@/api/testcase'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'ArticleList',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    toString(status) {
      alert(status)
      return status.toString()
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        rate: undefined
      },
      rateOptions: [1, 2, 3, 4, 5],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted']
    }
  },
  created() {
    // this.getList()
    this.getAll()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getAll() {
      this.listLoading = true
      fetchTestcaseAll({}).then(response => {
        this.list = response.items
        // this.total = response.total
        this.listLoading = false
      })
    },
    handleCreate() {
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getAll()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getAll()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getAll()
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
