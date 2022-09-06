"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pylon = void 0;
const chalk = require("chalk");
const pariah_1 = require("pariah");
var Pylon;
(function (Pylon) {
  Pylon.Url = new URL("https://pylon.bot/api/");
  class API extends pariah_1.Pariah {
    token;
    constructor(token) {
      super(Pylon.Url, { headers: { Authorization: token } });
      this.token = token;
      const payload = this.get.text("/user/guilds/available").then(() => {
        if (payload === "unauthorized") {
          console.error(chalk.redBright("🔒 Pylon Token Unauthorized"));
          process.exit(1);
        }
      });
    }
    async catch(endpoint, params = {}, options = {}) {
      const data = await this.get.text(endpoint, params, options);
      switch (data) {
        case "unauthorized":
          console.error(chalk.redBright("🔒 Pylon Token Unauthorized on " + endpoint));
          process.exit(1);
        case "user not authorized to edit this guild": 
          console.error(chalk.redBright("🔒 User is not able to edit this guild"));
          process.exit(1);
      }
      try { return JSON.parse(data); } catch (e) { if (typeof e === 'string' && e.includes('Internal Server Error')) {  return this.catch(endpoint, params, options) } throw e}
    }
    async user() {
      return this.catch("/user");
    }
    async guildStats(guildId) {
      return this.catch("/guilds/:guildId/stats", {
        ":guildId": guildId,
      });
    }
    async guild(guildId) {
      return this.catch("/guilds/:guildId", {
        ":guildId": guildId,
      });
    }
    async deployment(deploymentId) {
      return this.catch("/deployments/:deploymentId", {
        ":deploymentId": deploymentId,
      });
    }
    async guilds() {
      return this.catch("/user/guilds");
    }
    async guildsAvailable() {
      return await this.catch("/user/guilds/");
    }
    async publishDeployment(deploymentId, project) {
      return this.post.json(
        "/deployments/:deploymentId",
        {
          ":deploymentId": deploymentId,
        },
        {
          body: JSON.stringify({ script: project }),
        }
      );
    }
  }
  Pylon.API = API;
})((Pylon = exports.Pylon || (exports.Pylon = {})));
