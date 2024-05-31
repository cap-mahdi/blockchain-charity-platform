import { CampaignCreated as CampaignCreatedEvent } from '../generated/CharityCampaignFactory/CharityCampaignFactory';
import { CampaignCreated } from '../generated/schema';
import { CharityCampaign as CharityCampaignTemplate } from '../generated/templates';

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.campaignAddress = event.params.campaignAddress;
  entity.tokenAddress = event.params.tokenAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  let deployedContractAddress = event.params.campaignAddress;
  CharityCampaignTemplate.create(deployedContractAddress);

  entity.save();
}
