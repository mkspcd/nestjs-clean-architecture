import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { QueryRequestDto, QueryTransformPipe } from './queryStrings'

@Controller('users')
export class UserController {
  @Get()
  @UsePipes(new ValidationPipe())
  async getUsers(@Query(new QueryTransformPipe()) query?: QueryRequestDto) {
    console.log('Transformed query::', query)
    return query
  }
}
