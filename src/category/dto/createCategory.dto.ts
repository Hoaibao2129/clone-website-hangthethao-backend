import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Message } from "enum/message.enum";
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: Message.IS_NOT_EMPTY })
  // @Matches(/^[a-zA-Z0-9]*$/, { message: Message.INVALID_REQUEST })
  @ApiProperty({ example: 'category' })
  name: string;
}