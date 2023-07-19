import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FusionPipe implements PipeTransform {
  transform(value: string[], metadata: ArgumentMetadata) {
    console.log({ value });

    if (metadata.type === 'body') {
      return value.join('-').toUpperCase();
    }
    throw new BadRequestException(
      'Veuillez renseignez des informations cohérentes',
    );
  }
}
