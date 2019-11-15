import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @prop()
  @ApiModelProperty({ description: '课程名称' })
  name: string;

  @prop()
  @ApiModelProperty({ description: '封面图' })
  cover: string;

  // 使用字符串形式可以避免循环引用的问题
  @arrayProp({ itemsRef: 'Episode' })
  episodes: Array<Ref<Episode>>;
}
