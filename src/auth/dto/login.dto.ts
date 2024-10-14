import { ApiProperty } from "@nestjs/swagger";
export class LoginDto {
    @ApiProperty({ example: "0789712109" })
    tell: string;

    @ApiProperty({ example: "abc123" })
    password: string;
}