import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop()
  @ApiModelProperty({ description: '用户名', example: 'user1' })
  username: string;

  @prop()
  @ApiModelProperty({ description: '密码', example: 'pwd1' })
  password: string;
}
