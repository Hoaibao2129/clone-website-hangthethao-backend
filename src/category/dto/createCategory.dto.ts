import { IsString, IsNotEmpty, Matches } from "class-validator";
import { Message } from "../../enum/message.enum";
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]*$/, { message: Message.INVALID_REQUEST })
  name: string;
}