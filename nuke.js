token = "<put discord account token of someone who has permission to delete here>";
userId = "<self explanatory>";
channelId = "<self explanatory>";
sleepTime = 1000; // because rate limits
lastMessageId = null;

// copied straight from a normal discord client so it doesnt trip self bot detection
headers = {
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.5",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "no-cors",
  "Sec-Fetch-Site": "same-origin",
  Authorization: token,
  "X-Discord-Locale": "en-US",
  "X-Discord-Timezone": "Asia/Kolkata",
  "X-Debug-Options": "bugReporterEnabled",
  "Alt-Used": "discord.com",
  Pragma: "no-cache",
  "Cache-Control": "no-cache"
};

async function nuke() {
  url = new URL(`https://discord.com/api/v9/channels/${channelId}/messages?limit=100`);
  if (lastMessageId) url.searchParams.append("before", lastMessageId);

  messages = await fetch(url, {
    headers,
    referrer: "https://discord.com/channels/@me",
    method: "GET"
  }).then(r => r.json());
  if (!messages.length) return console.log("done");

  remaining = [];
  for (message of messages) {
    if (message.author.id === userId) await deleteMessage(message);
    remaining.push(message.id);
  };
  lastMessageId = remaining.sort((a, b) => a - b)[0];
  await sleep(sleepTime);
  nuke();
}

async function deleteMessage(message) {
  console.log(message.content);
  await sleep(sleepTime * (Math.random() + 1);
  return await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${message.id}`, {
    headers,
    referrer: `https://discord.com/channels/@me/${channelId}`,
    method: "DELETE"
  });
}

function sleep(time) {
  return new Promise(r => setTimeout(r, time));
}

nuke();
