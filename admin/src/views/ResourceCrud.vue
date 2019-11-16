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
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

interface IRow {
  _id: string;
  name: string;
  cover: string;
  episode: Array<String>;
}

interface IPage {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  pageSizes?: Array<number>;
}

@Component({})
export default class CourseList extends Vue {
  data = {};
  @Prop(String) resource!: string;

  page: IPage = {
    total: 1,
    pageSize: 2,
    pageSizes: [2, 5, 10],
  };

  query: any = {
    limit: 2,
  };

  // 表格配置
  option = {};

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

  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style></style>
