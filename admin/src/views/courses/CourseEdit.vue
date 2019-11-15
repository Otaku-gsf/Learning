<template>
  <div>
    <h3>{{ isCreate ? '创建' : '编辑' }}课程</h3>
    <ele-form
      :form-data="data"
      :form-desc="fields"
      :request-fn="submit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

interface IData {
  name: string;
  cover: string;
}

@Component({})
export default class CourseList extends Vue {
  data = {};

  @Prop(String) id!: string;

  get isCreate() {
    return !this.id;
  }

  fields = {
    name: { label: '课程名称', type: 'input' },
    cover: { label: '课程封面图', type: 'input' },
  };

  async fetch() {
    const res = await this.$axios.get(`courses/${this.id}`);
    this.data = res.data;
  }

  async submit(data: IData) {
    const url = this.isCreate ? `courses` : `courses/${this.id}`;
    const method = this.isCreate ? `post` : `put`;
    const message = this.isCreate ? '创建成功' : '修改成功';
    await this.$axios[method](url, data);
    this.data = {};
    this.$message.success(message);
    this.$router.go(-1);
  }

  created() {
    !this.isCreate && this.fetch();
  }
}
</script>

<style></style>
