import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Observable<never> {
    console.log(host);
    return throwError(() => exception);
  }
}
