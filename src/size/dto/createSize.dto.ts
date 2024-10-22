import { IsNotEmpty, IsString } from "class-validator";
import { Message } from "enum/message.enum";

export class CreateSizeDto {

    @IsString()
    @IsNotEmpty({ message: Message.IS_NOT_EMPTY })
    name: string;
}