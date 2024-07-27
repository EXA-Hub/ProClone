import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <nav
      dir="ltr"
      className="navbar_container__uMj16 navbar_container__home__jR4f0"
    >
      <div className=" ">
        <a href="/">
          <Image
            id="navbar_probot-logo__Celiw"
            width={98}
            height={23.05}
            draggable="false"
            src="/static/logo2.svg"
            priority
            alt="brand"
          />
        </a>
      </div>
      <div>
        <div>
          <Image
            src="/static/commandIcon.svg"
            width={16}
            height={16}
            alt="command-icon"
            draggable="false"
          />
          <h5>
            <div className=" ">
              <a href="/commands">Commands</a>
            </div>
          </h5>
        </div>
        <div>
          <Image
            src="/static/questionmark.svg"
            alt="question-mark"
            width={15}
            height={16}
            draggable="false"
          />
          <h5>
            <div className=" ">
              <a target="_blank" href="https://discord.com/invite/ProBot">
                Support
              </a>
            </div>
          </h5>
        </div>
      </div>
      <div>
        <Image
          className="flag inline-block"
          alt="en flag"
          width={30}
          height={20}
          src="/static/flags/us.png"
          draggable="false"
        />
      </div>
    </nav>
  );
};

export default Header;
