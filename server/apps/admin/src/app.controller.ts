import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
@ApiUseTags('首页')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async unload(@UploadedFile('file') file) {
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
