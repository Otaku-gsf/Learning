import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiUseTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiUseTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  option() {
    return {
      title: '课程管理',
      index: true,
      indexLabel: '序号',
      align: 'center',
      menuAlign: 'center',
      column: [
        {
          prop: 'name',
          label: '课程名称',
          sortable: true,
          search: true,
          // searchSpan: 8,
          rules: [
            {
              required: true,
              message: '请输入课程',
              trigger: 'blur',
            },
          ],
          row: true,
        },
        {
          prop: 'cover',
          label: '课程封面图',
          type: 'upload',
          listType: 'picture-img',
          action: 'upload',
          width: 120,
        },
      ],
    };
  }
}
