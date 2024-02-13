import { Injectable } from '@nestjs/common';
import { ActiveUserData } from '@src/authentication/interface/active-user.interface';
import { Policy } from '@src/authorization/interface/policy.interface';
import { PolicyHandler } from '@src/authorization/interface/policy-handler.inteface';
import { PolicyHandlerStorage } from '@src/authorization/storage/policy-handlers.storage';

export class FrameworkContributorPolicy implements Policy {
  name = 'FrameworkContributor';
}

@Injectable()
export class FrameworkContributorPolicyHandler
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(FrameworkContributorPolicy, this);
  }

  async handle(
    policy: FrameworkContributorPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    const isContributor = user.email.endsWith('@carehealth.io');
    if (!isContributor) {
      throw new Error('User is not belong to our organization');
    }
  }
}
