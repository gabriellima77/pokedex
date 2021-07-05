import React from 'react';
import githubLogo from '../assets/GitHub-Mark-64px.png';
import '../styles/footerStyles.css';

const Footer = ()=> {
  return (
    <footer className="footer">
      <p>Made by Gabriel Lima</p>
      <a rel="noreferrer" href="https://github.com/gabriellima77" target="_blank">
        <img className="github-logo" alt="github logo" src={githubLogo}></img>
      </a>
    </footer>
  );
}

export default Footer;