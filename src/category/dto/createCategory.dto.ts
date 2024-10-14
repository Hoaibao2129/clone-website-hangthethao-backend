import { IsString, IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Message } from "../../enum/message.enum";
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]*$/, { message: Message.INVALID_REQUEST })
  @ApiProperty({ example: 'category' })
  name: string;
}