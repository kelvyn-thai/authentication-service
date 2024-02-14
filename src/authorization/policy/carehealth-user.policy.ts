import { Injectable } from '@nestjs/common';
import { ActiveUserData } from '@src/authentication/interface/active-user.interface';
import { Policy } from '@src/authorization/interface/policy.interface';
import { PolicyHandler } from '@src/authorization/interface/policy-handler.inteface';
import { PolicyHandlerStorage } from '@src/authorization/storage/policy-handlers.storage';

export class CarehealthUserPolicy implements Policy {
  name = 'CareHealthUser';
}

@Injectable()
export class CarehealthUserPolicyHandler
  implements PolicyHandler<CarehealthUserPolicy>
{
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(CarehealthUserPolicy, this);
  }

  async handle(
    policy: CarehealthUserPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    console.log('user', user);
    const isContributor = user.email.endsWith('@carehealth.io');
    if (!isContributor) {
      throw new Error('User is not belong to our organization');
    }
  }
}
