import { ApiProperty } from "@nestjs/swagger";

export class refreshTokenDto {
    @ApiProperty({ example: "........" })
    refresh_token: string;
}