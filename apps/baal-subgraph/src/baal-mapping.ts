import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
	Activity,
  Dao,
  Member,
	MemberUri,
	ProposalUri,
  Proposal,
  // RageQuit,
  // Shaman,
  Vote,
} from "../generated/schema";

import {
  CancelProposal,
  DelegateChanged,
  DelegateVotesChanged,
  GovernanceConfigSet,
  LootPaused,
  ProcessingFailed,
  ProcessProposal,
  Ragequit,
  SetupComplete,
  ShamanSet,
  SharesPaused,
  SponsorProposal,
  SubmitProposal,
  SubmitVote,
  Transfer,
  TransferLoot
} from "../generated/templates/BaalTemplate/Baal";
import { constants } from "./util/constants";
// import { addTransaction } from "./util/transactions";

function burnShares(dao: Dao, memberId: string, amount: BigInt): void {
  let member = Member.load(memberId);

  if (member === null) {
    log.info("burn member not found", []);
  } else {
    member.shares = member.shares.minus(amount);

    member.save();
    dao.save();
  }
}

function mintShares(event: Transfer, dao: Dao, memberId: string): void {
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = event.address.toHexString();
    member.memberAddress = event.params.to;
    member.delegatingTo = event.params.to;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }

  member.shares = member.shares.plus(event.params.amount);

  member.save();
  dao.save();
}

function burnLoot(dao: Dao, memberId: string, amount: BigInt): void {
  let member = Member.load(memberId);

  if (member === null) {
    log.info("burn member not found, {}", [memberId]);
  } else {
    member.loot = member.loot.minus(amount);
    dao.totalLoot = dao.totalLoot.minus(amount);

    member.save();
    dao.save();
  }
}

function mintLoot(event: TransferLoot, dao: Dao, memberId: string): void {
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = event.address.toHexString();
    member.memberAddress = event.params.to;
    member.delegatingTo = event.params.to;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }

  member.loot = member.loot.plus(event.params.amount);
  dao.totalLoot = dao.totalLoot.plus(event.params.amount);

  member.save();
  dao.save();
}

// TransferLoot (index_topic_1 address from, index_topic_2 address to, uint256 amount)
export function handleTransferLoot(event: TransferLoot): void {
  log.info("handleTransfer, to: {}, from: {}, address: {}", [
    event.params.to.toHexString(),
    event.params.from.toHexString(),
    event.address.toHexString(),
  ]);

  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  //if from zero address it mints to a member
  if (event.params.from.toHexString() === constants.ADDRESS_ZERO) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      .concat(event.params.from.toHexString());

    mintLoot(event, dao, memberId);
    return;
  }

  //if to baal it burns from member
  if (event.params.to === event.address) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      .concat(event.params.from.toHexString());

    burnLoot(dao, memberId, event.params.amount);
    return;
  }

  //if member to member it transfers (add/subtract)
  let burnMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.from.toHexString());

  let mintMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.to.toHexString());

  burnLoot(dao, burnMemberId, event.params.amount);
  mintLoot(event, dao, mintMemberId);

}

// Transfer (index_topic_1 address from, index_topic_2 address to, uint256 value)
export function handleTransfer(event: Transfer): void {
  log.info("handleTransfer, to: {}, from: {}, address: {}", [
    event.params.to.toHexString(),
    event.params.from.toHexString(),
    event.address.toHexString(),
  ]);

  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  //if from zero address it mints to a member
  if (event.params.from.toHexString() === constants.ADDRESS_ZERO) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      .concat(event.params.from.toHexString());

    mintShares(event, dao, memberId);
    return;
  }

  //if to baal it burns from member
  if (event.params.to === event.address) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      .concat(event.params.from.toHexString());

    burnShares(dao, memberId, event.params.amount);
    return;
  }

  //if member to member it transfers (add/subtract)
  let burnMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.from.toHexString());

  let mintMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.to.toHexString());

  burnShares(dao, burnMemberId, event.params.amount);
  mintShares(event, dao, mintMemberId);

}

export function handleSetupComplete(event: SetupComplete): void {
  let daoId = event.address.toHexString();

  let dao = Dao.load(daoId);
  if (dao === null) {
    log.info("---no dao entity, {}", [daoId]);
    return;
  }

  dao.lootPaused = event.params.lootPaused;
  dao.sharesPaused = event.params.sharesPaused;
  dao.gracePeriod = event.params.gracePeriod;
  dao.votingPeriod = event.params.votingPeriod;
  dao.proposalOffering = event.params.proposalOffering;
  dao.quorumPercent = event.params.quorumPercent;
  dao.sponsorThreshold = event.params.sponsorThreshold;
  dao.minRetentionPercent = event.params.minRetentionPercent;
  dao.shareTokenName = event.params.name;
  dao.shareTokenSymbol = event.params.symbol;
  dao.totalShares = event.params.totalShares;
  dao.totalLoot = event.params.totalLoot;

  dao.save();
}


export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.delegate.toHexString());
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = event.address.toHexString();
    member.memberAddress = event.params.delegate;
    member.delegatingTo = event.params.delegate;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }

  member.delegateShares = event.params.newBalance;

  member.save();

}

export function handleDelegateChanged(event: DelegateChanged): void {
  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.delegator.toHexString());

  let member = Member.load(memberId);

  if (member === null) {
    log.info("handleDelegateChanged no delegator member: {}", [memberId]);
    return;
  }

  member.delegatingTo = event.params.toDelegate;

  member.save();

}

// Proposal Handlers
export function handleSubmitProposal(event: SubmitProposal): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let activityId = event.address
    .toHexString()
    .concat("-submit-")
    .concat(event.params.proposal.toString());
	let activity = new Activity(activityId)
	activity.createdAt = event.block.timestamp.toString();
	activity.dao = event.address.toHexString();
	activity.member = event.transaction.from;
	activity.activityType = "submit";
	activity.proposalId = event.params.proposal;

  let proposal = new Proposal(proposalId);
  proposal.createdAt = event.block.timestamp.toString();
  proposal.createdBy = event.transaction.from;
  proposal.dao = event.address.toHexString();
  proposal.proposalId = event.params.proposal;
  proposal.proposalDataHash = event.params.proposalDataHash;
  proposal.proposalData = event.params.proposalData;
  proposal.votingPeriod = event.params.votingPeriod;
  proposal.expiration = event.params.expiration;
  proposal.sponsored = event.params.selfSponsor;
  proposal.cancelled = false;
  proposal.processed = false;
  proposal.actionFailed = false;
  proposal.passed = false;
  proposal.proposalOffering = event.transaction.value;
  proposal.maxTotalSharesAndLootAtYesVote = constants.BIGINT_ZERO;
  proposal.selfSponsor = event.params.selfSponsor;
  proposal.votingStarts = event.params.selfSponsor
    ? event.block.timestamp
    : constants.BIGINT_ZERO;
  proposal.votingEnds = event.params.selfSponsor
    ? event.block.timestamp.plus(event.params.votingPeriod)
    : constants.BIGINT_ZERO;
  proposal.graceEnds = event.params.selfSponsor
    ? event.block.timestamp
        .plus(event.params.votingPeriod)
        .plus(dao.gracePeriod)
    : constants.BIGINT_ZERO;

  // let result = parser.getResultFromJson(event.params.details);
  // if (result.error != "none") {
  //   log.error("details parse error prop: {}", [proposalId]);
  //   proposal.details = event.params.details;
  // } else {
  //   let object = result.object;

  //   let title = parser.getStringFromJson(object, "title");
  //   if (title.error == "none") {
  //     proposal.title = title.data;
  //   }

  //   let description = parser.getStringFromJson(object, "description");
  //   if (description.error == "none") {
  //     proposal.description = description.data;
  //   }

  //   let proposalType = parser.getStringFromJson(object, "proposalType");
  //   if (proposalType.error == "none") {
  //     proposal.proposalType = proposalType.data;
  //   } else {
  //     proposal.proposalType = "unknown";
  //   }

  //   let contentURI = parser.getStringFromJson(object, "contentURI");
  //   if (contentURI.error == "none") {
  //     proposal.contentURI = contentURI.data;
  //   }

  //   let contentURIType = parser.getStringFromJson(object, "contentURIType");
  //   if (contentURIType.error == "none") {
  //     proposal.contentURIType = contentURIType.data;
  //   }
  // }

  proposal.save();
	activity.save()

}

export function handleSponsorProposal(event: SponsorProposal): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
	if (!proposal) {
		return
	}
  let activityId = event.address
    .toHexString()
    .concat("-sponsor-")
    .concat(event.params.proposal.toString());

	let activity = new Activity(activityId)

	activity.createdAt = event.block.timestamp.toString();
	activity.dao = event.address.toHexString();
	activity.member = event.params.member;
	activity.activityType = "sponsor";
	activity.proposalId = proposal.proposalId;



  proposal.sponsor = event.params.member;
  proposal.sponsored = true;
  proposal.votingStarts = event.block.timestamp;
  proposal.votingEnds = event.block.timestamp.plus(dao.votingPeriod);
  proposal.graceEnds = event.block.timestamp
    .plus(dao.votingPeriod)
    .plus(dao.gracePeriod);


  proposal.save();
	activity.save()
}

export function handleProcessProposal(event: ProcessProposal): void {
  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  let activityId = event.address
    .toHexString()
    .concat("-process-")
    .concat(event.params.proposal.toString());
	let activity = new Activity(activityId)

	activity.createdAt = event.block.timestamp.toString();
	activity.dao = event.address.toHexString();
	activity.activityType = "process";
	activity.proposalId = proposal.proposalId;



  proposal.processed = true;
  proposal.passed = event.params.passed;
  proposal.actionFailed = event.params.actionFailed;

  proposal.save();
	activity.save()
}

// why do we need this when the above event emit it too?
export function handleProcessingFailed(event: ProcessingFailed): void {
  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  proposal.actionFailed = true;

  proposal.save();

}

export function handleCancelProposal(event: CancelProposal): void {
  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }
 let activityId = event.address
    .toHexString()
    .concat("-cancel-")
    .concat(event.params.proposal.toString());
	let activity = new Activity(activityId)

	activity.createdAt = event.block.timestamp.toString();
	activity.dao = event.address.toHexString();
	activity.activityType = "cancelled";
	activity.proposalId = proposal.proposalId;




  proposal.cancelled = true;

  proposal.save();

}

export function handleSubmitVote(event: SubmitVote): void {
  let dao = ProposalUri.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  let voteId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toHexString())
    .concat("-vote-")
    .concat(event.params.member.toHexString());

  let vote = new Vote(voteId);

  vote.createdAt = event.block.timestamp.toString();
  vote.daoAddress = event.address;
  vote.approved = event.params.approved;
  vote.balance = event.params.balance;

  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.member.toHexString());
  vote.member = memberId;
  vote.proposal = proposalId;

  if (event.params.approved) {
    proposal.yesVotes = proposal.yesVotes.plus(constants.BIGINT_ONE);
    proposal.yesBalance = proposal.yesBalance.plus(event.params.balance);
  } else {
    proposal.noVotes = proposal.noVotes.plus(constants.BIGINT_ONE);
    proposal.noBalance = proposal.noBalance.plus(event.params.balance);
  }

  vote.save();
  proposal.save();

}

export function handleRageQuit(event: Ragequit): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.member.toHexString());

  if (event.params.lootToBurn !== constants.BIGINT_ZERO) {
    burnLoot(dao, memberId, event.params.lootToBurn);
  }

  if (event.params.sharesToBurn !== constants.BIGINT_ZERO) {
    burnShares(dao, memberId, event.params.sharesToBurn);
  }

}

export function handleSharesPaused(event: SharesPaused): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.sharesPaused = event.params.paused;

  dao.save();

}

export function handleLootPaused(event: LootPaused): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.lootPaused = event.params.paused;

  dao.save();

}

export function handleGovernanceConfigSet(event: GovernanceConfigSet): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.votingPeriod = event.params.voting;
  dao.gracePeriod = event.params.grace;
  dao.proposalOffering = event.params.newOffering;
  dao.quorumPercent = event.params.quorum;
  dao.sponsorThreshold = event.params.sponsor;
  dao.minRetentionPercent = event.params.minRetention;

  dao.save();

}
