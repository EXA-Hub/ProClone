import React, { useEffect, useState } from "react";
import Saver from "@/components/save";
import "@/styles/settings.css";
import Select from "react-select";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/router";

const Settings: React.FC = () => {
  const router = useRouter();

  const [defaultLanguage, setDef] = useState("English");
  const [lang, setLang] = useState<string>(defaultLanguage);
  const [save, setSave] = useState<boolean>(false);

  const [languageOptions, setLangs] = useState([
    { value: "English", label: "English" },
    { value: "العربية", label: "العربية" },
  ]);

  useEffect(() => {
    apiClient("/backend/api/guild/lang", "get", {
      params: { guildId: router.query.id },
    }).then((res) => {
      if (res.success) {
        setLangs(
          res.data.langs.map((lng: string) => ({ value: lng, label: lng }))
        );
        setDef(res.data.lang);
      }
    });
  }, [router.query.id]);

  return (
    <section className="dashboard-container">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <Saver
              view={save}
              onCancel={() => {
                apiClient("/backend/api/guild/lang", "post", {
                  params: {
                    guildId: router.query.id,
                    lang,
                  },
                }).then((res) => {
                  if (res.success) {
                    setDef(lang);
                    setSave(false);
                  }
                });
              }}
              onSave={() => {
                setSave(!(lang === defaultLanguage));
              }}
            />
            <div className="component-container">
              <div className="PagesTitle_pages-title__E_aAk">
                <div>
                  <h3 className="mt-10">Server Settings</h3>
                </div>
                <div>
                  <button
                    className="PagesTitle_reset-settings-button__su_jU"
                    onClick={() => {
                      setLang(defaultLanguage);
                      setSave(false);
                    }}
                  >
                    <i className="fas fa-undo-alt" />
                    Reset Settings
                  </button>
                </div>
              </div>
              <form role="form" id="server-settings__form" className="mt-20">
                <div className="fields_filled-select-input__ZrP9K full-width">
                  <label className="control-label">Language</label>
                  <div className="css-b62m3t-container">
                    <Select
                      options={languageOptions}
                      placeholder="Select a language"
                      className="formselect__control"
                      classNamePrefix="formselect"
                      onChange={(selectedOption) => {
                        if (selectedOption) setLang(selectedOption.value);
                        setSave(!(lang === defaultLanguage));
                      }}
                      value={languageOptions.find(
                        (option) => option.value === lang
                      )}
                    />
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
