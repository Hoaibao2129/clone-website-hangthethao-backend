import { ApiProperty } from "@nestjs/swagger";
export class AdminCreateDto {
    @ApiProperty({ example: "Hoài Bảo" })
    name: string;

    @ApiProperty({ example: "0789712109" })
    tel: string;

    @ApiProperty({ example: "abc123" })
    password: string;
}