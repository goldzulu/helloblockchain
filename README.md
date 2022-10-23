# Tooling for Alexa Voice Developer 

UPDATE: This initial SDK Implementation has won the Moralis Filecoin 1,2 Web3 Hackathon Grand Prize!

I intend to write a full video tutorial on this along with a blog post. And given resource will carry on working on the toolkit

## Coded Live over a span of many hours!

I am an AWS Community Builder (coming into the third year now!) and a voice technologies (certified Alexa Skill Builder) and blockchain/web3 evangelist (OG member of the DeveloperDao Pixel Avatars Derivatives project lead)

To record the whole effort (and frustrations for this hackathon), I have done everything LIVE on Twitch observed by others.

You can view the videos at [ https://www.twitch.tv/goldzulu ] under Hackathon / Hackathon Day 2.

The videos will be uploaded onto YouTube soon as Twitch only stores 30 day of recording.

## What is this?
- Persistent Storage Example (web3persistant.js)
  - Implementation of Persistence Adapter for Alexa to use instead of S3 or DynamoDB so the storage can be decentralise

- Wallet Example (voice command to check wallet balance)
  - Implementation of Voice Quering Ethereum Balance for a Wallet Address

The above two is encapsulated in a single Alexa demo skill called Hello Blockchain

[https://github.com/goldzulu/helloblockchain]

## What & Why

Currently there are over 1 million voice developers out there. It is a small niche but nevertheless a very important one for the future. More tooling is needed so more voice based skills can be produced.

According to Verified Market Research, the Speech and Voice Recognition Market size was valued at USD 7.5 Billion in 2021 and is projected to reach USD 59.6 Billion by 2030, growing at a CAGR of 22.57% from 2022 to 2030

## How
There are many challenges for a voice developer to overcome to access and use Web3 technologies

### Storage of data 
- currently is expensive for large audio and video files and bandwidth alone will cost a fortune
- typically a popular audio skill like a sleep skill will cost the developer their arms and legs if the users (even if there is a few) use the "sound skill" to stream audio throughout the night
- Filecoin, Web3.Storage. NFT.Storage and IPFS in general can help solve this problem by making it more cheap and affordable hence ultimately make developers produce more skills that benefits public good experience like meditation and mental health music for instance

### Lack of Web3 Wallet using Voice Access
- There needs to be more voice skills out there to help access wallets easily and facilitate the signing of transactions on Web3
- Currently the challenge is the UI experience. I believe I have a way to make this easier. Unfortunately due to resource constraint i was not able to implement it in the 1,2 Web3 hackathon
- I believe the future of Web3 is voice and voice is the future of Web3

## Background Info

### What is a Persistence Adapter?

Persistence adapters are a tool enabled by the Alexa SDK to simplify storing values between sessions. For example, in the [Cake Time tutorial](https://developer.amazon.com/en-US/alexa/alexa-skills-kit/get-deeper/tutorials-code-samples/build-an-engaging-alexa-skill), you're taught how to use the S3 persistence adapter to save the customer's birthday between visits.

### Why/when do I need a "Web3" persistence adapter?

As mentioned above, for various reasons, primarily cost and privacy, you may not want to use the S3 persistence adapter. This is where the Web3 persistence adapter comes in. It allows you to store data in a decentralized manner, using IPFS. It brings data away from the centralised sources and promote censorship resistance. Privacy can be achieved by encrypting the data.

## Set-up Instructions

### Step 1: Dependencies and running the sample

The skill have not submitted for certification yet, to compile you would have to have 
- An Amazon Alexa Skills developer account at least 
- Ask-sdk 2.0 installed
- Ask-Cli installed 

Use ```ask run`` command to run the skill locally 

### Step 2: API Keys

You would need to get the API key from both web3.storage (persistence storage adapter) and also moralis.io (wallet)
Fill them up in the .env (see .env-sample) in the /lambda directory (for production push) and in the main directory (for local debugging)

## Using the web3 persistence adapter seperately

In your index.js for your alexa skill

At the top of the file, import the web3 persistence adapter

```javascript
  const web3PersistenceAdapter = require('./web3persistant.js');
  const persistence_adapter = new web3PersistenceAdapter({token: YOUR_WEB3_STORAGE_TOKEN});
```
And use the Alexa.SkillBuilders.custom() .withPersistenceAdapter option
  
```javascript
  const skillBuilder = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
      LaunchRequestHandler,
      HelloWorldIntentHandler,
      HelpIntentHandler,
      CancelAndStopIntentHandler,
      SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .withPersistenceAdapter(persistence_adapter)
    .withApiClient(new Alexa.DefaultApiClient());
```

## More information and related links

[ASK SDK: Managing Attributes](https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/manage-attributes.html)

