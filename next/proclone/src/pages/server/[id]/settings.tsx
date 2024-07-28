import React, { useState } from "react";
import Saver from "@/components/save";
import "@/styles/settings.css";

const Settings: React.FC = () => {
  const [lang, setLang] = useState<string>("English");
  const [view, setView] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);

  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <Saver
              view={save}
              onCancel={() => {
                setSave(false);
              }}
              onSave={() => {
                setSave(false);
              }}
            />
            <div className="component-container">
              <div className="PagesTitle_pages-title__E_aAk">
                <div>
                  <h3 className="mt-10">Server Settings</h3>
                </div>
                <div>
                  <button className="PagesTitle_reset-settings-button__su_jU">
                    <i className="fas fa-undo-alt" />
                    Reset Settings
                  </button>
                </div>
              </div>
              <form role="form" id="server-settings__form" className="mt-20">
                <div className="fields_filled-select-input__ZrP9K full-width">
                  <label className="control-label ">Language</label>
                  <div className=" css-b62m3t-container" id="Language">
                    <div
                      onClick={() => setView(!view)}
                      className="formselect__control formselect__control--is-focused formselect__control--menu-is-open css-1pahdxg-control"
                    >
                      <div className="formselect__value-container formselect__value-container--has-value css-1d8n9bt">
                        <div className="formselect__single-value css-qc6sy-singleValue">
                          {lang}
                        </div>
                        <div
                          className="formselect__input-container css-ackcql"
                          data-value
                        >
                          {/* <input
                            className="formselect__input"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            id="react-select-3-input"
                            spellCheck="false"
                            tabIndex={0}
                            type="text"
                            aria-autocomplete="list"
                            aria-expanded="true"
                            aria-haspopup="true"
                            role="combobox"
                            defaultValue="English"
                            style={{
                              color: "inherit",
                              background: "0px center",
                              opacity: 1,
                              width: "100%",
                              gridArea: "1 / 2",
                              font: "inherit",
                              minWidth: "2px",
                              border: "0px",
                              margin: "0px",
                              outline: "0px",
                              padding: "0px",
                            }}
                            aria-controls="react-select-3-listbox"
                            aria-owns="react-select-3-listbox"
                          /> */}
                        </div>
                      </div>
                      <div className="formselect__indicators css-1wy0on6">
                        <span className="formselect__indicator-separator css-1okebmr-indicatorSeparator" />
                        <div
                          className="formselect__indicator formselect__dropdown-indicator css-1gtu0rj-indicatorContainer"
                          aria-hidden="true"
                        >
                          <svg
                            height={20}
                            width={20}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            focusable="false"
                            className="css-8mmkcg"
                          >
                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {view ? (
                      <div
                        className="formselect__menu css-26l3qy-menu"
                        id="react-select-3-listbox"
                      >
                        <div className="formselect__menu-list css-11unzgr">
                          <div
                            className="formselect__option css-yt9ioa-option"
                            aria-disabled="false"
                            id="react-select-3-option-0"
                            tabIndex={-1}
                            onClick={() => {
                              setLang("العربية");
                              setView(false);
                            }}
                          >
                            العربية
                          </div>
                          <div
                            className="formselect__option css-yt9ioa-option"
                            aria-disabled="false"
                            id="react-select-3-option-0"
                            tabIndex={-1}
                            onClick={() => {
                              setLang("English");
                              setView(false);
                            }}
                          >
                            English
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Settings;
