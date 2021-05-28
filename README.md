# pagopa-chat

## Question

Write a very simple chat server that should listen on TCP port 10000 for clients. The chat protocol is very simple, clients connect with "telnet" and write single lines of text. On each new line of text, the server will broadcast that line to all other connected clients. Your program should be fully tested too. (provide a link to your solution)

## Installation

Requires [Node.js](https://nodejs.org/) v14+ and [TypeScript](https://www.typescriptlang.org/) to run.

Install the dependencies and devDependencies, compile with TypeScript and start the server.

```sh
cd pagopa-chat
npm i
tsc
node build/socketServer.js
```
