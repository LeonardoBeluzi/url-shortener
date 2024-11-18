import { ApiProperty } from '@nestjs/swagger';

export class ShowAuthDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibXktZW1haWxAZW1haWwuY29tIiwiaWF0IjoxNzMxOTU0NTU4LCJleHAiOjE3MzIwNDA5NTh9.3iiRmXgKgz0a-snU1OyzcBnBsfKPAUNuH26I4CejEZI',
  })
  access_token: string;
}
