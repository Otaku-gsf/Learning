<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      :page="page"
      @row-save="add"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="sortChange"
      @search-change="searchChange"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

/* 定义每一行数据 */
interface IRow {
  _id: string;
  name: string;
  cover: string;
  episode: Array<String>;
}

/* 定义分页配置 */
interface IPage {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  pageSizes?: Array<number>;
}

/* 定义排序配置 */
interface ISort {
  prop: string;
  order: string;
}

/* 定义查询参数 */
interface IQuery {
  order?: ISort | null;
  limit?: number;
  page?: number;
  where?: Iwhere;
}

/* 定义表格参数选项 */
interface IOption {
  [propName: string]: any;
}

/* 定义搜索参数 */
interface Iwhere {
  column: Array<object>;
  [propName: string]: any;
}

@Component({})
export default class CourseList extends Vue {
  data = {};
  @Prop(String) resource!: string;

  page: IPage = {
    total: 1,
    pageSize: 5,
    pageSizes: [5, 10],
  };

  query: IQuery = {};

  // 表格配置
  option: IOption = {};

  // 搜索功能
  searchChange(where: any) {
    for (const key in where) {
      if (where.hasOwnProperty(key)) {
        const fields = this.option.column.find((v: any) => v.prop === key);
        if (fields.regex) {
          where[key] = { $regex: where[key] };
        }
      }
    }

    this.query.where = where;
    this.fetch();
  }

  // 排序功能
  sortChange({ prop, order }: ISort) {
    if (!order) {
      this.query.order = null;
    } else {
      this.query = {
        [prop]: order === 'ascending' ? 1 : -1,
      };
    }
    this.fetch();
  }

  // 分页查询
  async changePage({ pageSize, currentPage }: IPage) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  // 获取表格配置信息
  async fetchOption() {
    const res = await this.$axios.get(`${this.resource}/option`);
    this.option = res.data;
  }

  // 添加数据
  async add(row: IRow, done: Function, loading: Function) {
    await this.$axios.post(this.resource, row);
    this.$message.success('创建成功');
    this.fetch();
    done();
  }

  // 更新数据
  async update(row: IRow, index: number, done: Function, loading: Function) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$axios.put(`${this.resource}/${row._id}`, data);
    this.$message.success('修改成功');
    this.fetch();
    done();
  }

  // 删除数据
  async remove(row: IRow) {
    try {
      await this.$confirm('是否删除');
    } catch (e) {
      return;
    }

    await this.$axios.delete(`${this.resource}/${row._id}`);
    this.$message.success('删除成功');
    this.fetch();
  }

  // 获取数据
  async fetch() {
    const res = await this.$axios.get(this.resource, {
      params: {
        query: this.query,
      },
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style></style>
