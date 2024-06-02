import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/domains/user/entities/user.entity';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      console.log('user:00000: ');
      const tets = await super.canActivate(context);
      console.log('user:11111: ', tets);
      const request = context.switchToHttp().getRequest();
      console.log('user:222');
      const user = request.user as User;
      console.log('user: ', user);

      return !!user;
    } catch (error) {
      console.log('error: ', error);
      
      if (error.status === 401) {
        throw new NotFoundException({ status: 401, message: 'Unauthorized' });
      }
    }
  }
}
