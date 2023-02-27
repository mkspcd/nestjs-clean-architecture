import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "../../../domain/models";
import { QueryRequestDto, QueryTransformPipe } from "./queryStrings";

@Controller("users")
export class UserController {
  @Get()
  @UsePipes(new ValidationPipe())
  async getUsers(
    @Query(new QueryTransformPipe<User>()) query?: QueryRequestDto<User>
  ) {
    console.log("Transformed query::", query);
    return query;
  }
}
