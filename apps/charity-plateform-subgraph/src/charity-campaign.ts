import { Donation } from '../generated/schema';
import { DonationReceived } from '../generated/templates/CharityCampaign/CharityCampaign';
export function handleDonationReceived(event: DonationReceived): void {
  let donation = new Donation(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  donation.donor = event.params.donor;
  donation.amount = event.params.amount;
  donation.tokensIssued = event.params.tokensIssued;

  donation.save();
}
