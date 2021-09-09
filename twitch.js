const { Chat } = window.TwitchJs;
let channel = "echtkpvl";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has('channel')) channel = urlParams.get('channel');

const handleMessage = (msg) => {
    if (msg.event != "PRIVMSG") return;

    if (msg.message.startsWith("!drop")) engine.drop(msg.username);
    if (msg.message.startsWith("!cut")) engine.cut(msg.username);
    if (msg.message.startsWith("!abdicate")) engine.abdicate(msg.username);
};

const run = async () => {
    const chat = new Chat({
        undefined,
        undefined,
        log: { level: "warn" }
    });

    chat.on("*", (message) => {
        handleMessage(message);
    });

    await chat.connect();
    await chat.join(channel);
    return chat;
};

const chatobj = run();
