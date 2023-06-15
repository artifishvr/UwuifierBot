<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/artificialbutter/UwuifierBot">
    <img src="icon.png" alt="Icon" width="80" height="80">
  </a>

  <h3 align="center">Uwuifier</h3>
  <img src='https://img.shields.io/github/license/artificialbutter/UwuifierBot?style=flat-square'>
  <img src='https://img.shields.io/github/commit-activity/m/artificialbutter/UwuifierBot?style=flat-square'>
  
  <p align="center">
    <a href="https://discord.com/api/oauth2/authorize?client_id=969743347138822174&permissions=2147801152&scope=bot%20applications.commands"><strong>Invite the bot! »</strong></a>
    <br />
    <a href="https://github.com/artificialbutter/UwuifierBot/issues">Report Bug</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#self-hosting">Self Hosting</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About

The Uwuifier discord bot is a easy way to mess around with text in discord.
You can uwuify text, turn it into a emojipasta, or even convert it to morse code.

<img src="screenshot.png"
         alt="Screenshot">


The bot uses Discord Slash Commands, so you can find the command list in your discord client. (See Discord's <a href="https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ">Slash Command FAQ</a> for more info)



<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [discord.js](https://discord.js.org/)
* [/Create](https://www.npmjs.com/package/slash-create)
* [uwuifier](https://www.npmjs.com/package/@patarapolw/uwuifier)
* [replace-word](https://www.npmjs.com/package/replace-word)



<!-- SELF HOSTING -->
## Self Hosting
### Docker (Recommended)
1. Install <a href="https://docs.docker.com/get-docker/">Docker </a> 
2. Run `docker run --env=DISCORD_CLIENT_ID=BOTID --env=DISCORD_CLIENT_TOKEN=BOTTOKEN --env=DISCORD_CLIENT_PUBKEY=BOTPUBLICKEY -d ghcr.io/artificialbutter/uwuifierbot:main` <br>(replacing BOTID, BOTTOKEN, and BOTPUBLICKEY with your bot's info)
### Manual
Requirements:
* [Node.js](https://nodejs.org/en/) v18.16.0 LTS or newer
* npm
* git

Steps:
1. Clone the repo with `git clone https://github.com/artificialbutter/UwuifierBot.git`
2. Install required packages with `npm install` 
3. Start the bot with `npm start`


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GNU General Public License. See `LICENSE` for more information.


<p align="right">(<a href="#top">back to top</a>)</p>
