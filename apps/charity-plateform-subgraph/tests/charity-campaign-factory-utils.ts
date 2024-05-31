import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { CampaignCreated } from "../generated/CharityCampaignFactory/CharityCampaignFactory"

export function createCampaignCreatedEvent(
  campaignAddress: Address,
  tokenAddress: Address
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignAddress",
      ethereum.Value.fromAddress(campaignAddress)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return campaignCreatedEvent
}
