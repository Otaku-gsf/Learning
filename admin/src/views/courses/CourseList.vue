<template>
  <div>
    <h3>课程列表</h3>
    <div>
      <el-button type="primary" @click="$router.push('/courses/create')"
        >添加</el-button
      >
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class CourseList extends Vue {
  data = {};

  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面图' },
  };

  async fetch() {
    const res = await this.$axios.get('courses');
    this.data = res.data;
  }

  async remove(id: string) {
    try {
      await this.$confirm('是否删除');
    } catch (e) {
      return;
    }

    await this.$axios.delete(`courses/${id}`);
    this.$message.success('删除成功');
    this.fetch();
  }

  created() {
    this.fetch();
  }
}
</script>

<style></style>
