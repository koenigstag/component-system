
import { ValidateClass, IsNumber, IsString } from 'method-validator';

export const smth: number = 123;

@ValidateClass
export class Test {
  method(@IsNumber() myParam0: number, @IsString() myParam1: string) {
    console.log('method called', myParam0);
  }
}
