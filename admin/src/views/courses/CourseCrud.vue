<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      @row-save="add"
      @row-update="update"
      @row-del="remove"
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

@Component({})
export default class CourseList extends Vue {
  data = {};

  @Prop(String) resource!: string;

  // 表格配置
  option = {};

  // 获取数据
  async fetch() {
    const res = await this.$axios.get(this.resource);
    this.data = res.data;
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
    this.fetch();
    this.fetchOption();
  }
}
</script>

<style></style>
